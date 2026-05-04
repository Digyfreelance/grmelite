import { Link } from "react-router-dom";
import { Instagram, Facebook, Mail, MapPin, Phone } from "lucide-react";
import { categories } from "@/data/catalog";

export const Footer = () => (
  <footer className="bg-gradient-soft border-t border-border mt-20">
    <div className="container py-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
      <div>
        <h3 className="font-display text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">GRM Elite Wear</h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">Trendy, affordable fashion for women & kids — proudly crafted from Ranipet, Tamil Nadu.</p>
        <div className="flex gap-3">
          <a href="#" aria-label="Instagram" className="h-9 w-9 rounded-full bg-background flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-smooth"><Instagram className="h-4 w-4"/></a>
          <a href="#" aria-label="Facebook" className="h-9 w-9 rounded-full bg-background flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-smooth"><Facebook className="h-4 w-4"/></a>
        </div>
      </div>
      <div>
        <h4 className="font-display font-semibold mb-4">Shop</h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          {categories.map(c => <li key={c.slug}><Link to={`/category/${c.slug}`} className="hover:text-primary transition-smooth">{c.name}</Link></li>)}
        </ul>
      </div>
      <div>
        <h4 className="font-display font-semibold mb-4">Help</h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li><Link to="/track" className="hover:text-primary transition-smooth">Track Order</Link></li>
          <li><Link to="/contact" className="hover:text-primary transition-smooth">Contact Us</Link></li>
          <li><Link to="/login" className="hover:text-primary transition-smooth">My Account</Link></li>
          <li><Link to="/wishlist" className="hover:text-primary transition-smooth">Wishlist</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="font-display font-semibold mb-4">Reach Us</h4>
        <ul className="space-y-3 text-sm text-muted-foreground">
          <li className="flex gap-2"><MapPin className="h-4 w-4 mt-0.5 shrink-0"/>Ranipet, Tamil Nadu, India</li>
          <li className="flex gap-2"><Mail className="h-4 w-4 mt-0.5 shrink-0"/>support@grmelitewear.com</li>
          <li className="flex gap-2"><Phone className="h-4 w-4 mt-0.5 shrink-0"/>+91-XXXXXXXXXX</li>
        </ul>
      </div>
    </div>
    <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
      © {new Date().getFullYear()} GRM Elite Wear. All rights reserved. · Made with ♥ in Tamil Nadu
    </div>
  </footer>
);
