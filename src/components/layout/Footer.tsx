import { Link } from "react-router-dom";
import { Instagram, Facebook, Youtube, Mail, MapPin, Phone } from "lucide-react";
import { categories } from "@/data/catalog";
import logo from "@/assets/logo.png";

export const Footer = () => (
  <footer className="bg-gradient-soft border-t border-border mt-20">
    <div className="container py-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
      {/* About */}
      <div>
        <img src={logo} alt="GRM Elite Wear logo" className="h-12 w-auto mb-3" />
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          GRM Elite Wear brings you trendy, affordable fashion for women and kids. Curated styles, premium fabrics, and pan-India delivery — all from our flagship store in Coimbatore, Tamil Nadu.
        </p>
        <div className="flex gap-3">
          <a href="https://www.instagram.com/grm.elitewear/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="h-9 w-9 rounded-full bg-background flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-smooth"><Instagram className="h-4 w-4"/></a>
          <a href="https://www.facebook.com/p/GRM-Elite-Wear-61560377717897/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="h-9 w-9 rounded-full bg-background flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-smooth"><Facebook className="h-4 w-4"/></a>
          <a href="https://www.youtube.com/@GRM_Elite_WEAR" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="h-9 w-9 rounded-full bg-background flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-smooth"><Youtube className="h-4 w-4"/></a>
        </div>
      </div>

      {/* Quick links */}
      <div>
        <h4 className="font-display font-semibold mb-4">Quick Links</h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li><Link to="/track" className="hover:text-primary transition-smooth">Track Order</Link></li>
          <li><Link to="/contact" className="hover:text-primary transition-smooth">Contact Us</Link></li>
          <li><Link to="/login" className="hover:text-primary transition-smooth">My Account</Link></li>
          <li><Link to="/wishlist" className="hover:text-primary transition-smooth">Wishlist</Link></li>
          <li><Link to="/cart" className="hover:text-primary transition-smooth">Cart</Link></li>
        </ul>
      </div>

      {/* Categories */}
      <div>
        <h4 className="font-display font-semibold mb-4">Categories</h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          {categories.map(c => <li key={c.slug}><Link to={`/category/${c.slug}`} className="hover:text-primary transition-smooth">{c.name}</Link></li>)}
        </ul>
      </div>

      {/* Contact info */}
      <div>
        <h4 className="font-display font-semibold mb-4">Contact Info</h4>
        <ul className="space-y-3 text-sm text-muted-foreground">
          <li className="flex gap-2"><MapPin className="h-4 w-4 mt-0.5 shrink-0 text-primary"/>GRM Maternity Store, Trichy Rd, opposite KMCH Hospital, Mathiyalagan Nagar, Sulur, Coimbatore, Tamil Nadu 641402</li>
          <li className="flex gap-2"><Phone className="h-4 w-4 mt-0.5 shrink-0 text-primary"/><a href="tel:+918807144175" className="hover:text-primary">+91 88071 44175</a></li>
          <li className="flex gap-2"><Mail className="h-4 w-4 mt-0.5 shrink-0 text-primary"/><a href="mailto:Support@grmelitewear.com" className="hover:text-primary">Support@grmelitewear.com</a></li>
        </ul>
      </div>
    </div>
    <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
      © {new Date().getFullYear()} GRM Elite Wear. All rights reserved. · Made with ♥ in Tamil Nadu
    </div>
  </footer>
);
