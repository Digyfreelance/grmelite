import { Link, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { useShop } from "@/context/ShopContext";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";

const Cart = () => {
  const { cart, updateQty, removeFromCart, cartTotal } = useShop();
  const navigate = useNavigate();
  const shipping = cartTotal > 999 || cart.length === 0 ? 0 : 79;
  const total = cartTotal + shipping;

  return (
    <Layout>
      <div className="container py-10 md:py-14">
        <h1 className="font-display text-3xl md:text-4xl font-bold mb-8">Your Cart</h1>
        {cart.length === 0 ? (
          <div className="text-center py-20">
            <ShoppingBag className="h-14 w-14 mx-auto text-muted-foreground mb-4"/>
            <p className="text-muted-foreground mb-6">Your cart is empty.</p>
            <Link to="/" className="inline-flex items-center gap-2 bg-foreground text-background px-7 py-3 rounded-full font-medium hover:bg-primary transition-smooth">Start shopping <ArrowRight className="h-4 w-4"/></Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1fr_380px] gap-8">
            <div className="space-y-3">
              {cart.map(({ product, qty }) => (
                <div key={product.id} className="flex gap-4 bg-card rounded-2xl p-4 shadow-soft">
                  <Link to={`/product/${product.id}`} className="shrink-0">
                    <img src={product.image} alt={product.name} className="h-28 w-24 object-cover rounded-xl"/>
                  </Link>
                  <div className="flex-1 min-w-0 flex flex-col">
                    <Link to={`/product/${product.id}`} className="font-display font-medium line-clamp-1 hover:text-primary">{product.name}</Link>
                    <div className="text-xs text-muted-foreground capitalize">{product.subcategory}</div>
                    <div className="font-semibold mt-1">₹{product.price}</div>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center gap-2 h-9 px-2 rounded-full border border-border">
                        <button onClick={() => updateQty(product.id, qty - 1)} className="h-6 w-6 rounded-full hover:bg-secondary flex items-center justify-center" aria-label="Decrease"><Minus className="h-3 w-3"/></button>
                        <span className="w-6 text-center text-sm">{qty}</span>
                        <button onClick={() => updateQty(product.id, qty + 1)} className="h-6 w-6 rounded-full hover:bg-secondary flex items-center justify-center" aria-label="Increase"><Plus className="h-3 w-3"/></button>
                      </div>
                      <button onClick={() => removeFromCart(product.id)} className="h-9 w-9 rounded-full hover:bg-destructive/10 hover:text-destructive flex items-center justify-center transition-smooth" aria-label="Remove"><Trash2 className="h-4 w-4"/></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <aside className="bg-gradient-soft rounded-3xl p-6 h-fit lg:sticky lg:top-28 space-y-4">
              <h2 className="font-display text-xl font-bold">Order summary</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>₹{cartTotal}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>{shipping === 0 ? "Free" : `₹${shipping}`}</span></div>
                <div className="border-t border-border pt-3 flex justify-between font-display font-bold text-lg"><span>Total</span><span>₹{total}</span></div>
              </div>
              <button onClick={() => navigate("/checkout")} className="w-full h-12 rounded-full bg-gradient-primary text-primary-foreground font-medium hover:opacity-90 shadow-elegant transition-smooth">Proceed to Checkout</button>
              <Link to="/" className="block text-center text-sm text-muted-foreground hover:text-primary">Continue shopping</Link>
            </aside>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Cart;
