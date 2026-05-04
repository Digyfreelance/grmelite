import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { useShop } from "@/context/ShopContext";
import { toast } from "sonner";
import { CheckCircle2 } from "lucide-react";

const Checkout = () => {
  const { cart, cartTotal, clearCart } = useShop();
  const navigate = useNavigate();
  const [pay, setPay] = useState("cod");
  const [done, setDone] = useState<string | null>(null);
  const shipping = cartTotal > 999 ? 0 : 79;
  const total = cartTotal + shipping;

  if (cart.length === 0 && !done) {
    return <Layout><div className="container py-20 text-center"><p className="text-muted-foreground mb-4">Your cart is empty.</p><Link to="/" className="text-primary">Go shopping</Link></div></Layout>;
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const orderId = "GRM" + Date.now().toString().slice(-8);
    clearCart();
    setDone(orderId);
    toast.success("Order placed!");
  };

  if (done) return (
    <Layout>
      <div className="container py-20 max-w-lg text-center">
        <CheckCircle2 className="h-16 w-16 mx-auto text-primary mb-4"/>
        <h1 className="font-display text-3xl font-bold mb-2">Order placed!</h1>
        <p className="text-muted-foreground mb-1">Thank you for shopping with GRM Elite Wear.</p>
        <p className="mb-8">Your order ID is <strong>{done}</strong></p>
        <div className="flex gap-3 justify-center">
          <button onClick={() => navigate("/track", { state: { id: done } })} className="bg-foreground text-background px-6 py-3 rounded-full font-medium hover:bg-primary transition-smooth">Track order</button>
          <Link to="/" className="px-6 py-3 rounded-full border border-border font-medium hover:border-primary transition-smooth">Continue shopping</Link>
        </div>
      </div>
    </Layout>
  );

  return (
    <Layout>
      <div className="container py-10 md:py-14">
        <h1 className="font-display text-3xl md:text-4xl font-bold mb-8">Checkout</h1>
        <form onSubmit={submit} className="grid lg:grid-cols-[1fr_380px] gap-8">
          <div className="space-y-8">
            <section className="bg-card p-6 rounded-2xl shadow-soft">
              <h2 className="font-display text-xl font-bold mb-4">Contact</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                <input required type="email" placeholder="Email" className="h-11 px-4 rounded-lg border border-border bg-background"/>
                <input required type="tel" placeholder="Phone" className="h-11 px-4 rounded-lg border border-border bg-background"/>
              </div>
            </section>
            <section className="bg-card p-6 rounded-2xl shadow-soft">
              <h2 className="font-display text-xl font-bold mb-4">Shipping address</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                <input required placeholder="First name" className="h-11 px-4 rounded-lg border border-border bg-background"/>
                <input required placeholder="Last name" className="h-11 px-4 rounded-lg border border-border bg-background"/>
                <input required placeholder="Address" className="h-11 px-4 rounded-lg border border-border bg-background sm:col-span-2"/>
                <input required placeholder="City" className="h-11 px-4 rounded-lg border border-border bg-background"/>
                <input required placeholder="State" defaultValue="Tamil Nadu" className="h-11 px-4 rounded-lg border border-border bg-background"/>
                <input required placeholder="Pincode" pattern="[0-9]{6}" className="h-11 px-4 rounded-lg border border-border bg-background"/>
                <input required placeholder="Country" defaultValue="India" className="h-11 px-4 rounded-lg border border-border bg-background"/>
              </div>
            </section>
            <section className="bg-card p-6 rounded-2xl shadow-soft">
              <h2 className="font-display text-xl font-bold mb-4">Payment</h2>
              <div className="space-y-2">
                {[
                  { id: "cod", label: "Cash on Delivery", desc: "Pay when you receive your order" },
                  { id: "upi", label: "UPI / GPay / PhonePe", desc: "Coming soon" },
                  { id: "card", label: "Credit / Debit Card", desc: "Coming soon" },
                ].map(o => (
                  <label key={o.id} className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-smooth ${pay === o.id ? "border-primary bg-secondary" : "border-border hover:border-primary"} ${o.id !== "cod" ? "opacity-60" : ""}`}>
                    <input type="radio" name="pay" disabled={o.id !== "cod"} checked={pay === o.id} onChange={() => setPay(o.id)} className="mt-1 accent-primary"/>
                    <div><div className="font-medium">{o.label}</div><div className="text-xs text-muted-foreground">{o.desc}</div></div>
                  </label>
                ))}
              </div>
            </section>
          </div>
          <aside className="bg-gradient-soft rounded-3xl p-6 h-fit lg:sticky lg:top-28 space-y-4">
            <h2 className="font-display text-xl font-bold">Summary</h2>
            <div className="space-y-2 max-h-60 overflow-auto">
              {cart.map(({ product, qty }) => (
                <div key={product.id} className="flex gap-3 text-sm">
                  <img src={product.image} alt="" className="h-14 w-12 object-cover rounded-lg"/>
                  <div className="flex-1"><div className="line-clamp-1">{product.name}</div><div className="text-xs text-muted-foreground">Qty {qty}</div></div>
                  <div>₹{product.price * qty}</div>
                </div>
              ))}
            </div>
            <div className="space-y-2 text-sm border-t border-border pt-3">
              <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>₹{cartTotal}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>{shipping === 0 ? "Free" : `₹${shipping}`}</span></div>
              <div className="flex justify-between font-display font-bold text-lg pt-2 border-t border-border"><span>Total</span><span>₹{total}</span></div>
            </div>
            <button type="submit" className="w-full h-12 rounded-full bg-gradient-primary text-primary-foreground font-medium shadow-elegant hover:opacity-90 transition-smooth">Place Order</button>
          </aside>
        </form>
      </div>
    </Layout>
  );
};
export default Checkout;
