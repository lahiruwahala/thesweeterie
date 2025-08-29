import { Resend } from "resend";

export const runtime = "nodejs";          // use Node runtime
export const dynamic = "force-dynamic";   // don't try to pre-render
export const revalidate = 0;              // no caching

let resend: Resend | null = null;

export async function POST(req: Request) {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    // Fail gracefully at runtime instead of crashing the build
    return Response.json(
      { ok: false, error: "Missing RESEND_API_KEY environment variable" },
      { status: 500 }
    );
  }

  // Lazy init (only once per server instance)
  if (!resend) resend = new Resend(key);

  try {
    const { items = [], customer = {} } = await req.json();

    const total = items.reduce(
      (sum: number, i: any) => sum + (Number(i?.price) || 0),
      0
    );

    const listHtml = items
      .map(
        (i: any) =>
          `<li>${i.name ?? ""} – ${i.chosenSize ?? ""} – $${Number(i.price).toFixed(2)}</li>`
      )
      .join("");

    const html = `
      <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;">
        <h2>New order – ${customer?.name || "Customer"}</h2>
        <p><strong>Email:</strong> ${customer?.email || "-"}</p>
        <p><strong>Phone:</strong> ${customer?.phone || "-"}</p>
        <p><strong>Pickup/Delivery:</strong> ${customer?.delivery || "-"}</p>
        <p><strong>Date needed:</strong> ${customer?.date || "-"}</p>
        <h3>Items</h3>
        <ul>${listHtml}</ul>
        <p><strong>Total:</strong> $${total.toFixed(2)}</p>
        <h3>Notes</h3>
        <p>${(customer?.notes || "").replace(/\n/g, "<br/>")}</p>
      </div>
    `;

    const { data, error } = await resend.emails.send({
      from: "The Sweeterie <onboarding@resend.dev>", // change after verifying your domain in Resend
      to: ["orders@thesweeterie.com.au"],            // update to your real inbox
      subject: `New order – ${customer?.name || "Customer"}`,
      html,
      // reply_to: customer?.email, // optional
    });

    if (error) return Response.json({ ok: false, error }, { status: 500 });
    return Response.json({ ok: true, id: data?.id });
  } catch (e: any) {
    return Response.json({ ok: false, error: String(e) }, { status: 400 });
  }
}
