import { Link, NavLink } from "react-router-dom";
import { Heart, ShoppingBag, Search, Menu, X, User, Package } from "lucide-react";
import { useEffect, useState } from "react";
import { useShop } from "@/context/ShopContext";
import { categories } from "@/data/catalog";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo.png";
import { SearchModal } from "@/components/SearchModal";

export const Header = () => {
  const { cartCount, wishlist } = useShop();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setSearchOpen(true);
      } else if (e.key === "/" && !["INPUT", "TEXTAREA"].includes((e.target as HTMLElement)?.tagName)) {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/85 backdrop-blur-xl supports-[backdrop-filter]:bg-background/70">
      <div className="hidden md:flex justify-center text-xs py-2 bg-gradient-primary text-primary-foreground">
        <span>✨ Free shipping across India on orders above ₹999 · Easy 7-day returns</span>
      </div>
      <div className="container flex h-16 md:h-20 items-center gap-4">
        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
        <Link to="/" className="flex items-center gap-2 mr-2" aria-label="GRM Elite Wear home">
          <img src={logo} alt="GRM Elite Wear logo" className="h-10 md:h-12 w-auto" />
        </Link>
        <nav className="hidden md:flex items-center gap-7 ml-4 text-sm font-medium">
          {categories.map(c => (
            <NavLink key={c.slug} to={`/category/${c.slug}`} className={({ isActive }) =>
              cn("transition-smooth hover:text-primary", isActive && "text-primary")}>
              {c.name}
            </NavLink>
          ))}
          <NavLink to="/track" className="transition-smooth hover:text-primary text-muted-foreground">Track Order</NavLink>
          <NavLink to="/contact" className="transition-smooth hover:text-primary text-muted-foreground">Contact</NavLink>
        </nav>
        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          <button onClick={() => setSearchOpen(true)} className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-secondary transition-smooth" aria-label="Search">
            <Search className="h-5 w-5" />
          </button>
          <Link to="/login" className="hidden sm:flex h-10 w-10 items-center justify-center rounded-full hover:bg-secondary transition-smooth" aria-label="Account">
            <User className="h-5 w-5" />
          </Link>
          <Link to="/wishlist" className="relative h-10 w-10 flex items-center justify-center rounded-full hover:bg-secondary transition-smooth" aria-label="Wishlist">
            <Heart className="h-5 w-5" />
            {wishlist.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full h-4 min-w-4 px-1 flex items-center justify-center">{wishlist.length}</span>
            )}
          </Link>
          <Link to="/cart" className="relative h-10 w-10 flex items-center justify-center rounded-full hover:bg-secondary transition-smooth" aria-label="Cart">
            <ShoppingBag className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full h-4 min-w-4 px-1 flex items-center justify-center">{cartCount}</span>
            )}
          </Link>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-border bg-background animate-fade-in">
          <nav className="container flex flex-col py-4 gap-1">
            {categories.map(c => (
              <Link key={c.slug} to={`/category/${c.slug}`} onClick={() => setOpen(false)} className="py-3 px-2 rounded-lg hover:bg-secondary text-base">{c.name}</Link>
            ))}
            <Link to="/track" onClick={() => setOpen(false)} className="py-3 px-2 rounded-lg hover:bg-secondary text-base flex items-center gap-2"><Package className="h-4 w-4"/>Track Order</Link>
            <Link to="/contact" onClick={() => setOpen(false)} className="py-3 px-2 rounded-lg hover:bg-secondary text-base">Contact</Link>
            <Link to="/login" onClick={() => setOpen(false)} className="py-3 px-2 rounded-lg hover:bg-secondary text-base">Login / Register</Link>
          </nav>
        </div>
      )}
    </header>
    <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};
