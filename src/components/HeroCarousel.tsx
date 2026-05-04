import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Star } from "lucide-react";
import hero1 from "@/assets/hero.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";

type Slide = {
  image: string;
  badge: string;
  title: React.ReactNode;
  subtitle: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref: string;
  secondaryLabel: string;
  offerTag: string;
};

const slides: Slide[] = [
  {
    image: hero1,
    badge: "New Season · Up to 40% off",
    title: <>Upgrade your style with <span className="bg-gradient-primary bg-clip-text text-transparent">GRM Elite Wear</span></>,
    subtitle: "Trendy. Affordable. Everyday fashion for women & kids — handpicked from Tamil Nadu, delivered across India.",
    primaryHref: "/category/women",
    primaryLabel: "Shop Women",
    secondaryHref: "/category/kids",
    secondaryLabel: "Shop Kids",
    offerTag: "Flat 30% OFF on Festive Edit",
  },
  {
    image: hero2,
    badge: "The Pastel Edit",
    title: <>Soft tones, <span className="bg-gradient-primary bg-clip-text text-transparent">strong impressions</span></>,
    subtitle: "Silk, chiffon and breezy cotton — fabrics that feel as good as they look.",
    primaryHref: "/category/women",
    primaryLabel: "Explore Women",
    secondaryHref: "/category/girls",
    secondaryLabel: "Shop Girls",
    offerTag: "Buy 2 Get 10% Extra",
  },
  {
    image: hero3,
    badge: "Little Stars",
    title: <>Festive looks <span className="bg-gradient-primary bg-clip-text text-transparent">your kids will love</span></>,
    subtitle: "From baby onesies to sparkly party dresses — comfort meets celebration.",
    primaryHref: "/category/kids",
    primaryLabel: "Shop Kids",
    secondaryHref: "/category/boys",
    secondaryLabel: "Shop Boys",
    offerTag: "Free Shipping above ₹999",
  },
];

export const HeroCarousel = () => {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI(p => (p + 1) % slides.length), 5500);
    return () => clearInterval(t);
  }, []);

  const s = slides[i];

  return (
    <section className="relative overflow-hidden bg-gradient-hero">
      <div className="container relative grid lg:grid-cols-2 gap-8 items-center py-14 md:py-20 lg:py-28">
        <div key={`text-${i}`} className="space-y-6 animate-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-background/80 backdrop-blur border border-border text-xs font-medium">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            {s.badge}
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold leading-[1.05] tracking-tight text-balance">
            {s.title}
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-md leading-relaxed">{s.subtitle}</p>
          <div className="flex flex-wrap gap-3">
            <Link to={s.primaryHref} className="group inline-flex items-center gap-2 bg-foreground text-background px-7 py-3.5 rounded-full font-medium hover:bg-primary transition-smooth shadow-elegant">
              {s.primaryLabel} <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-smooth" />
            </Link>
            <Link to={s.secondaryHref} className="inline-flex items-center gap-2 bg-background border border-border px-7 py-3.5 rounded-full font-medium hover:border-primary transition-smooth">
              {s.secondaryLabel}
            </Link>
          </div>
          <div className="flex items-center gap-6 pt-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-1"><Star className="h-3.5 w-3.5 fill-primary text-primary" /><strong className="text-foreground">4.8</strong> · 2,400+ reviews</div>
            <div>📦 Pan-India shipping</div>
          </div>

          <div className="flex items-center gap-2 pt-4">
            {slides.map((_, k) => (
              <button
                key={k}
                onClick={() => setI(k)}
                aria-label={`Slide ${k + 1}`}
                className={`h-1.5 rounded-full transition-all ${k === i ? "w-8 bg-primary" : "w-4 bg-foreground/20 hover:bg-foreground/40"}`}
              />
            ))}
          </div>
        </div>

        <div key={`img-${i}`} className="relative animate-scale-in">
          <div className="absolute -inset-8 bg-gradient-primary opacity-20 blur-3xl rounded-full" />
          <img
            src={s.image}
            alt={`GRM Elite Wear ${s.primaryLabel}`}
            width={1600}
            height={900}
            className="relative rounded-3xl shadow-elegant w-full object-cover aspect-[4/5] lg:aspect-[5/6]"
          />
          <div className="absolute -bottom-4 -left-4 bg-background rounded-2xl shadow-card p-4 hidden md:flex items-center gap-3 animate-float max-w-[260px]">
            <div className="h-10 w-10 rounded-full bg-gradient-primary flex items-center justify-center shrink-0">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Today's offer</div>
              <div className="font-display font-semibold text-sm leading-tight">{s.offerTag}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
