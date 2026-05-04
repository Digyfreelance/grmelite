import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Product } from "@/data/catalog";

type CartItem = { product: Product; qty: number };

type ShopState = {
  cart: CartItem[];
  wishlist: string[];
  addToCart: (p: Product, qty?: number) => void;
  removeFromCart: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
  toggleWishlist: (id: string) => void;
  inWishlist: (id: string) => boolean;
  cartCount: number;
  cartTotal: number;
};

const ShopContext = createContext<ShopState | null>(null);

export const ShopProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try { return JSON.parse(localStorage.getItem("grm_cart") || "[]"); } catch { return []; }
  });
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem("grm_wishlist") || "[]"); } catch { return []; }
  });

  useEffect(() => { localStorage.setItem("grm_cart", JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem("grm_wishlist", JSON.stringify(wishlist)); }, [wishlist]);

  const addToCart = (p: Product, qty = 1) =>
    setCart(c => {
      const ex = c.find(i => i.product.id === p.id);
      if (ex) return c.map(i => i.product.id === p.id ? { ...i, qty: i.qty + qty } : i);
      return [...c, { product: p, qty }];
    });
  const removeFromCart = (id: string) => setCart(c => c.filter(i => i.product.id !== id));
  const updateQty = (id: string, qty: number) =>
    setCart(c => c.map(i => i.product.id === id ? { ...i, qty: Math.max(1, qty) } : i));
  const clearCart = () => setCart([]);
  const toggleWishlist = (id: string) =>
    setWishlist(w => w.includes(id) ? w.filter(x => x !== id) : [...w, id]);
  const inWishlist = (id: string) => wishlist.includes(id);

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cart.reduce((s, i) => s + i.qty * i.product.price, 0);

  return (
    <ShopContext.Provider value={{ cart, wishlist, addToCart, removeFromCart, updateQty, clearCart, toggleWishlist, inWishlist, cartCount, cartTotal }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be inside ShopProvider");
  return ctx;
};
