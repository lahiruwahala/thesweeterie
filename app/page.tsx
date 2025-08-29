
"use client";
import React, { useEffect, useMemo, useState } from "react";

const OWNER_EMAIL = "kaushchand@gmail.com"; // TODO: change to your real email

const CAKES = [
  {
    id: "classic-vanilla",
    name: "Classic Vanilla",
    description:
      "Moist vanilla sponge with vanilla bean buttercream. Simple, elegant, and a crowd favourite.",
    price: 55,
    sizes: ["6\" (6–8 serves)", "8\" (10–12 serves)", "10\" (16–20 serves)"],
    tags: ["vanilla", "popular", "birthday"],
    image:
      "./photos/image1.jpg",
  },
  {
    id: "choc-ganache",
    name: "Chocolate Ganache",
    description:
      "Rich cocoa layers coated in silky dark chocolate ganache. Decadent and not too sweet.",
    price: 68,
    sizes: ["6\"", "8\"", "10\""],
    tags: ["chocolate", "rich", "anniversary"],
    image:
      "https://images.unsplash.com/photo-1551024709-8f23befc6cf7?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "red-velvet",
    name: "Red Velvet",
    description:
      "Velvety crumb with hint of cocoa, layered with cream cheese frosting.",
    price: 72,
    sizes: ["6\"", "8\""],
    tags: ["cream-cheese", "wedding", "popular"],
    image:
      "https://images.unsplash.com/photo-1599785209796-9e7f9aee0f54?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "lemon-zest",
    name: "Lemon Zest",
    description:
      "Citrus sponge soaked in lemon syrup with light Swiss meringue buttercream.",
    price: 62,
    sizes: ["6\"", "8\"", "sheet"],
    tags: ["lemon", "fresh", "spring"],
    image:
      "https://images.unsplash.com/photo-1614707267537-3e77f66cba4c?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "gluten-free-almond",
    name: "Gluten‑Free Almond",
    description:
      "Flourless almond cake with orange blossom—naturally gluten‑free.",
    price: 76,
    sizes: ["6\"", "8\""],
    tags: ["gluten-free", "almond"],
    image:
      "https://images.unsplash.com/photo-1541976076758-347942db1970?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "strawberry-cream",
    name: "Strawberries & Cream",
    description:
      "Vanilla layers, whipped cream, and fresh macerated strawberries.",
    price: 70,
    sizes: ["6\"", "8\"", "10\""],
    tags: ["fruity", "summer", "popular"],
    image:
      "https://images.unsplash.com/photo-1541789094913-f3809a8a0a03?q=80&w=1200&auto=format&fit=crop",
  },
];

const GALLERY = [
  {
    id: "gal-1",
    title: "Pastel birthday drip",
    image:
      "https://images.unsplash.com/photo-1572451472228-83b90a3d6d72?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "gal-2",
    title: "Semi‑naked rustic wedding",
    image:
      "https://images.unsplash.com/photo-1523365280197-f1783db9fe62?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "gal-3",
    title: "Chocolate shards celebration",
    image:
      "https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "gal-4",
    title: "Fresh florals & gold leaf",
    image:
      "https://images.unsplash.com/photo-1541832676-9b763b0239ab?q=80&w=1200&auto=format&fit=crop",
  },
];

function classNames(...c: string[]) {
  return c.filter(Boolean).join(" ");
}

function Section({
  title,
  description,
  children,
  actions,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}) {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 my-8">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">{title}</h2>
          {description && (
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          )}
        </div>
        {actions}
      </div>
      {children}
    </section>
  );
}

function TopBar({
  current,
  setCurrent,
  cartCount,
}: {
  current: string;
  setCurrent: (v: string) => void;
  cartCount: number;
}) {
  const tabs = [
    { id: "shop", label: "Shop" },
    { id: "gallery", label: "Previous Cakes" },
    { id: "services", label: "Other Services" },
    { id: "feedback", label: "Customer Feedback" },
    { id: "contact", label: "Contact Us" },
  ];

  return (
    <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🎂</span>
          <div>
            <h1 className="text-lg sm:text-xl font-bold">The Sweeterie</h1>
            <p className="text-xs text-muted-foreground">Handmade cakes in Sydney</p>
          </div>
        </div>
        <nav className="hidden md:flex gap-2">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setCurrent(t.id)}
              className={classNames(
                "px-3 py-2 rounded-xl text-sm font-medium",
                current === t.id ? "bg-gray-900 text-white" : "hover:bg-gray-100"
              )}
              aria-current={current === t.id}
            >
              {t.label}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrent("shop")}
            className="relative px-3 py-2 rounded-xl hover:bg-gray-100"
            aria-label="Cart"
          >
            <span className="text-xl">🧺</span>
            {!!cartCount && (
              <span className="absolute -top-1 -right-1 bg-gray-900 text-white text-xs rounded-full px-1.5 py-0.5">
                {cartCount}
              </span>
            )}
          </button>
          <button
            className="md:hidden px-3 py-2 rounded-xl hover:bg-gray-100"
            onClick={() => setCurrent(current)}
            aria-label="Menu"
            title="Use the tab bar by scrolling horizontally on mobile"
          >
            ☰
          </button>
        </div>
      </div>
      {/* Mobile tabs */}
      <div className="md:hidden border-t overflow-x-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex gap-2">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setCurrent(t.id)}
              className={classNames(
                "px-3 py-2 rounded-xl text-sm shrink-0",
                current === t.id ? "bg-gray-900 text-white" : "bg-gray-100"
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}

function Shop({ addToCart }: { addToCart: (item: any) => void }) {
  const [q, setQ] = useState("");
  const [tag, setTag] = useState("all");
  const [sort, setSort] = useState("popular");

  const tags = useMemo(() => {
    const t = new Set(CAKES.flatMap((c) => c.tags));
    return ["all", ...Array.from(t)];
  }, []);

  const visible = useMemo(() => {
    let v = CAKES.filter((c) =>
      [c.name, c.description, c.tags.join(" ")].join(" ").toLowerCase().includes(q.toLowerCase())
    );
    if (tag !== "all") v = v.filter((c) => c.tags.includes(tag));

    if (sort === "price-asc") v = [...v].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") v = [...v].sort((a, b) => b.price - a.price);
    if (sort === "popular")
      v = [...v].sort(
        (a, b) => (b.tags.includes("popular") ? 1 : 0) - (a.tags.includes("popular") ? 1 : 0)
      );

    return v;
  }, [q, tag, sort]);

  return (
    <Section
      title="Shop cakes"
      description="Browse our handmade cakes. Choose a size and add to basket—checkout sends us your order details via email."
      actions={
        <div className="flex flex-wrap gap-2 items-center">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search flavour, tag…"
            className="border rounded-xl px-3 py-2 text-sm w-44"
            aria-label="Search cakes"
          />
          <select
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            className="border rounded-xl px-3 py-2 text-sm"
            aria-label="Filter by tag"
          >
            {tags.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border rounded-xl px-3 py-2 text-sm"
            aria-label="Sort"
          >
            <option value="popular">Popular</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      }
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {visible.map((c) => (
          <article key={c.id} className="border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition">
            <img src={c.image} alt={c.name} className="h-48 w-full object-cover" />
            <div className="p-4 flex flex-col gap-3">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-lg font-semibold leading-tight">{c.name}</h3>
                <span className="font-semibold">${"{"+ "c.price" +"}"}</span>
              </div>
              <p className="text-sm text-muted-foreground">{c.description}</p>
              <div className="flex flex-wrap gap-2">
                {c.tags.map((t: string) => (
                  <span key={t} className="text-xs bg-gray-100 rounded-full px-2 py-1">
                    {t}
                  </span>
                ))}
              </div>
              <SizePicker sizes={c.sizes} onAdd={(size) => addToCart({ ...c, chosenSize: size })} />
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

function SizePicker({ sizes, onAdd }: { sizes: string[]; onAdd: (s: string) => void }) {
  const [s, setS] = useState(sizes[0] ?? "default");
  return (
    <div className="flex items-center justify-between gap-2">
      <select
        value={s}
        onChange={(e) => setS(e.target.value)}
        className="border rounded-xl px-3 py-2 text-sm"
        aria-label="Choose size"
      >
        {sizes.map((z) => (
          <option key={z} value={z}>
            {z}
          </option>
        ))}
      </select>
      <button onClick={() => onAdd(s)} className="bg-gray-900 text-white rounded-xl px-4 py-2 text-sm">
        Add
      </button>
    </div>
  );
}

function Cart({
  items,
  remove,
  clear,
  onCheckout,
}: {
  items: any[];
  remove: (item: any) => void;
  clear: () => void;
  onCheckout: () => void;
}) {
  const total = items.reduce((sum, i) => sum + i.price, 0);
  return (
    <Section title="Your basket" description="Review your selection before checkout.">
      {items.length === 0 ? (
        <p className="text-sm text-muted-foreground">Your basket is empty.</p>
      ) : (
        <div className="grid gap-4">
          {items.map((i) => (
            <div key={`${i.id}-${i.chosenSize}`} className="flex items-center gap-4 border rounded-xl p-3">
              <img src={i.image} alt="" className="h-16 w-16 rounded-lg object-cover" />
              <div className="flex-1">
                <p className="font-medium">
                  {i.name} <span className="text-muted-foreground">· {i.chosenSize}</span>
                </p>
                <p className="text-sm">${"{"+ "i.price" +"}"}</p>
              </div>
              <button className="text-sm underline" onClick={() => remove(i)}>
                Remove
              </button>
            </div>
          ))}
          <div className="flex items-center justify-between border-t pt-4">
            <p className="font-semibold">Total</p>
            <p className="font-semibold">${"{"+ "total" +"}"}</p>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 rounded-xl border" onClick={clear}>
              Clear
            </button>
            <button className="px-4 py-2 rounded-xl bg-gray-900 text-white" onClick={onCheckout}>
              Checkout
            </button>
          </div>
        </div>
      )}
    </Section>
  );
}

function CheckoutModal({
  open,
  close,
  items,
}: {
  open: boolean;
  close: () => void;
  items: any[];
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [delivery, setDelivery] = useState("Pickup");
  const [notes, setNotes] = useState("");

  const total = items.reduce((s, i) => s + i.price, 0);

  const mailto = useMemo(() => {
    const subject = encodeURIComponent(`Cake order – ${name || "New customer"}`);
    const lines = [
      `Customer: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `Pickup/Delivery: ${delivery}`,
      `Date: ${date}`,
      "",
      "Items:",
      ...items.map((i) => `• ${i.name} – ${i.chosenSize} – $${i.price}`),
      "",
      `Total: $${total}`,
      "",
      `Notes: ${notes}`,
    ];
    const body = encodeURIComponent(lines.join("\\n"));
    return `mailto:${OWNER_EMAIL}?subject=${subject}&body=${body}`;
  }, [name, email, phone, delivery, date, notes, items, total]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-30 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold">Checkout</h3>
          <button onClick={close} className="text-2xl leading-none">×</button>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Fill in your details and click <strong>Confirm & Email</strong>. Your email app will open with a pre‑filled order email.
        </p>
        <form className="grid gap-3 mt-4" onSubmit={(e) => e.preventDefault()}>
          <label className="grid gap-1">
            <span className="text-sm">Name</span>
            <input className="border rounded-xl px-3 py-2" value={name} onChange={(e) => setName(e.target.value)} required />
          </label>
          <label className="grid gap-1">
            <span className="text-sm">Email</span>
            <input type="email" className="border rounded-xl px-3 py-2" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>
          <label className="grid gap-1">
            <span className="text-sm">Phone</span>
            <input className="border rounded-xl px-3 py-2" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </label>
          <div className="grid sm:grid-cols-2 gap-3">
            <label className="grid gap-1">
              <span className="text-sm">Pickup/Delivery</span>
              <select className="border rounded-xl px-3 py-2" value={delivery} onChange={(e) => setDelivery(e.target.value)}>
                <option>Pickup</option>
                <option>Delivery (quote on confirmation)</option>
              </select>
            </label>
            <label className="grid gap-1">
              <span className="text-sm">Date needed</span>
              <input type="date" className="border rounded-xl px-3 py-2" value={date} onChange={(e) => setDate(e.target.value)} />
            </label>
          </div>
          <label className="grid gap-1">
            <span className="text-sm">Notes (dietary, message on cake, colours)</span>
            <textarea className="border rounded-xl px-3 py-2" rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} />
          </label>
          <a href={mailto} className="mt-2 inline-flex items-center justify-center gap-2 bg-gray-900 text-white rounded-xl px-4 py-2">
            Confirm & Email
            <span aria-hidden>✉️</span>
          </a>
          <p className="text-xs text-muted-foreground">
            By confirming you consent to be contacted regarding your order. We’ll reply to confirm availability and pricing (delivery quoted if selected).
          </p>
        </form>
      </div>
    </div>
  );
}

function Gallery() {
  return (
    <Section
      title="Previous cakes"
      description="A small selection from recent bakes. We love custom designs—send through your inspo!"
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {GALLERY.map((g) => (
          <figure key={g.id} className="rounded-2xl overflow-hidden border shadow-sm">
            <img src={g.image} alt={g.title} className="h-56 w-full object-cover" />
            <figcaption className="p-3 text-sm">{g.title}</figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}

function Services() {
  const items = [
    {
      icon: "🧁",
      title: "Cupcakes & Treat Boxes",
      desc: "Perfect for parties and office shout—minimum 12, mix-and-match flavours.",
    },
    { icon: "🍪", title: "Custom Cookies", desc: "Logo cookies, stamped messages, or themed sets." },
    { icon: "🎉", title: "Event Catering", desc: "Dessert tables, mini tarts, and more—send your brief for a quote." },
    { icon: "🍰", title: "Dietary Options", desc: "Gluten‑free and dairy‑free on request. We use separate tools but a shared kitchen." },
  ];
  return (
    <Section title="Other services" description="More sweet things we can help with.">
      <div className="grid sm:grid-cols-2 gap-4">
        {items.map((i) => (
          <div key={i.title} className="border rounded-2xl p-4 flex items-start gap-3">
            <span className="text-2xl">{i.icon}</span>
            <div>
              <h3 className="font-semibold">{i.title}</h3>
              <p className="text-sm text-muted-foreground">{i.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Feedback() {
  const [entries, setEntries] = useState([
    { name: "Amelia", msg: "The red velvet was a hit—moist and gorgeous!", rating: 5 },
    { name: "Josh", msg: "Great service and the lemon zest flavour slapped.", rating: 5 },
  ]);
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const [rating, setRating] = useState(5 as number | string);

  return (
    <Section title="Customer feedback" description="Leave a quick review—thanks for supporting a local home business!">
      <form
        className="grid sm:grid-cols-[1fr_auto_auto] gap-3 mb-6"
        onSubmit={(e) => {
          e.preventDefault();
          if (!name || !msg) return;
          setEntries([{ name, msg, rating: Number(rating) }, ...entries]);
          setName("");
          setMsg("");
          setRating(5);
        }}
      >
        <input className="border rounded-xl px-3 py-2" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
        <select className="border rounded-xl px-3 py-2" value={rating} onChange={(e) => setRating(e.target.value)}>
          {[5, 4, 3, 2, 1].map((r) => (
            <option key={r} value={r}>{r} ★</option>
          ))}
        </select>
        <button className="bg-gray-900 text-white rounded-xl px-4 py-2">Post</button>
        <textarea className="sm:col-span-3 border rounded-xl px-3 py-2" placeholder="Your message" value={msg} onChange={(e) => setMsg(e.target.value)} />
      </form>
      <div className="grid gap-3">
        {entries.map((e, idx) => (
          <div key={idx} className="border rounded-2xl p-4 flex items-start gap-3">
            <span aria-hidden>💬</span>
            <div>
              <p className="font-medium">
                {e.name} <span className="text-yellow-500" aria-label={`${e.rating} stars`}>{"★".repeat(e.rating)}</span>
              </p>
              <p className="text-sm">{e.msg}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Contact() {
  return (
    <Section title="Contact us" description="We bake to order in Sydney. Please allow 3–5 days’ notice where possible.">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="border rounded-2xl p-5">
          <h3 className="font-semibold mb-2">Details</h3>
          <ul className="text-sm grid gap-1">
            <li>
              <strong>Email:</strong> <a className="underline" href={`mailto:${OWNER_EMAIL}`}>{OWNER_EMAIL}</a>
            </li>
            <li>
              <strong>Phone:</strong> <a className="underline" href="tel:+61400000000">+61 400 000 000</a>
            </li>
            <li>
              <strong>Instagram:</strong> <a className="underline" href="#">@thesweeterie</a>
            </li>
          </ul>
          <p className="text-xs text-muted-foreground mt-3">
            Licensed home‑based kitchen. Council compliant. ABN available on invoice.
          </p>
        </div>
        <div className="border rounded-2xl p-5">
          <h3 className="font-semibold mb-2">Enquiry form</h3>
          <form className="grid gap-3" onSubmit={(e) => e.preventDefault()}>
            <input className="border rounded-xl px-3 py-2" placeholder="Name" />
            <input className="border rounded-xl px-3 py-2" placeholder="Email" type="email" />
            <textarea className="border rounded-xl px-3 py-2" rows={4} placeholder="How can we help?" />
            <button className="bg-gray-900 text-white rounded-xl px-4 py-2">Send</button>
            <p className="text-xs text-muted-foreground">(Demo only – use email link above or order via checkout.)</p>
          </form>
        </div>
      </div>
    </Section>
  );
}

function Footer() {
  return (
    <footer className="border-t mt-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-sm text-muted-foreground grid gap-2">
        <p>© {new Date().getFullYear()} The Sweeterie. Handmade cakes in Sydney. All rights reserved.</p>
        <p><a className="underline" href="#">Privacy</a> · <a className="underline" href="#">Terms</a></p>
      </div>
    </footer>
  );
}

export default function SweeterieSite() {
  const [current, setCurrent] = useState("shop");
  const [cart, setCart] = useState<any[]>(() => {
    try {
      const raw = localStorage.getItem("cart");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  const [showCheckout, setShowCheckout] = useState(false);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: any) => setCart((c) => [...c, item]);
  const remove = (item: any) =>
    setCart((c) =>
      c.filter(
        (x, idx) => !(x.id === item.id && x.chosenSize === item.chosenSize && x.price === item.price && idx === c.indexOf(x))
      )
    );
  const clear = () => setCart([]);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <TopBar current={current} setCurrent={setCurrent} cartCount={cart.length} />

      {/* Hero */}
      <section className="bg-gradient-to-b from-gray-50 to-white border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">Small‑batch cakes, made to order</h2>
            <p className="mt-3 text-muted-foreground">
              Custom celebration cakes, cupcakes, and dessert tables. Order online and we’ll confirm your booking by email.
            </p>
            <div className="mt-5 flex gap-3">
              <button className="bg-gray-900 text-white rounded-xl px-4 py-2" onClick={() => setCurrent("shop")}>
                Shop cakes
              </button>
              <button className="border rounded-xl px-4 py-2" onClick={() => setCurrent("gallery")}>
                See previous bakes
              </button>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1612208695882-02f2322c1b47?q=80&w=1200&auto=format&fit=crop"
              alt="Decorated layer cake with fresh florals"
              className="rounded-3xl border shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Main */}
      <main>
        {current === "shop" && (
          <>
            <Shop addToCart={addToCart} />
            <Cart items={cart} remove={remove} clear={clear} onCheckout={() => setShowCheckout(true)} />
          </>
        )}
        {current === "gallery" && <Gallery />}
        {current === "services" && <Services />}
        {current === "feedback" && <Feedback />}
        {current === "contact" && <Contact />}
      </main>

      <Footer />

      <CheckoutModal open={showCheckout} close={() => setShowCheckout(false)} items={cart} />
    </div>
  );
}
