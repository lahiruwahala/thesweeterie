import { Resend } from "resend";

export const runtime = "nodejs"; // run on Node (not Edge)

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { items, customer } = await req.json();
    const total = (items || []).reduce((s: number, i: any) => s + (i.price || 0), 0);

    const list = (items || [])
      .map(
        (i: any) =>
          `<li>${i.name} – ${i.chosenSize || ""} – $${i.price?.toFixed?.(2) ?? i.price}</li>`
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
        <ul>${list}</ul>
        <p><strong>Total:</strong> $${total.toFixed(2)}</p>
        <h3>Notes</h3>
        <p>${(customer?.notes || "").replace(/\n/g, "<br/>")}</p>
      </div>
    `;

    // For first tests, use the Resend testing sender below.
    // After you verify your domain in Resend, change both `from` and `to` to your addresses.
    const { data, error } = await resend.emails.send({
      from: "The Sweeterie <onboarding@resend.dev>",
      to: ["kaushchand@gmailcom"], // TODO: change to your real inbox
      subject: `New order – ${customer?.name || "Customer"}`,
      html,
      // Optional: make replies go to your customer automatically
      // reply_to: customer?.email,
    });

    if (error) {
      return Response.json({ ok: false, error }, { status: 500 });
    }
    return Response.json({ ok: true, id: data?.id });
  } catch (e: any) {
    return Response.json({ ok: false, error: String(e) }, { status: 400 });
  }
}