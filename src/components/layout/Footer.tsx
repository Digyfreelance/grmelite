import { Link } from "react-router-dom";
import { Instagram, Facebook, Mail, MapPin, Phone, MessageCircle } from "lucide-react";
import { categories } from "@/data/catalog";
import logo from "@/assets/logo.png";

export const Footer = () => (
  <footer className="bg-gradient-soft border-t border-border mt-20">
    <div className="container py-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
      <div>
        <img src={logo} alt="GRM Elite Wear logo" className="h-12 w-auto mb-3" />
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">Trendy, affordable fashion for women & kids — proudly crafted from Ranipet, Tamil Nadu. 3–5 day delivery within Tamil Nadu, 7–10 days pan-India.</p>
        <div className="flex gap-3">
          <a href="https://instagram.com/grmelitewear" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="h-9 w-9 rounded-full bg-background flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-smooth"><Instagram className="h-4 w-4"/></a>
          <a href="https://facebook.com/grmelitewear" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="h-9 w-9 rounded-full bg-background flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-smooth"><Facebook className="h-4 w-4"/></a>
          <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="h-9 w-9 rounded-full bg-background flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-smooth"><MessageCircle className="h-4 w-4"/></a>
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
          <li className="flex gap-2"><MapPin className="h-4 w-4 mt-0.5 shrink-0"/>GRM Elite Wear, Ranipet, Vellore Dist., Tamil Nadu 632401, India</li>
          <li className="flex gap-2"><Mail className="h-4 w-4 mt-0.5 shrink-0"/><a href="mailto:support@grmelitewear.com" className="hover:text-primary">support@grmelitewear.com</a></li>
          <li className="flex gap-2"><Phone className="h-4 w-4 mt-0.5 shrink-0"/><a href="tel:+919999999999" className="hover:text-primary">+91 99999 99999</a></li>
          <li className="flex gap-2"><MessageCircle className="h-4 w-4 mt-0.5 shrink-0"/><a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer" className="hover:text-primary">WhatsApp Support</a></li>
        </ul>
      </div>
    </div>
    <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
      © {new Date().getFullYear()} GRM Elite Wear. All rights reserved. · Made with ♥ in Tamil Nadu
    </div>
  </footer>
);
