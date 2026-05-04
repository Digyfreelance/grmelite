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
};

const slides: Slide[] = [
  {
    image: hero1,
    badge: "New Season · Up to 40% off",
    title: <>Upgrade Your Style <br className="hidden sm:block" />with <span className="italic font-light">GRM Elite Wear</span></>,
    subtitle: "Trendy & Affordable Fashion for Women and Kids — handpicked from Tamil Nadu, delivered across India.",
    primaryHref: "/category/women",
    primaryLabel: "Shop Women",
    secondaryHref: "/category/kids",
    secondaryLabel: "Shop Kids",
  },
  {
    image: hero2,
    badge: "The Pastel Edit",
    title: <>Soft tones, <br className="hidden sm:block" /><span className="italic font-light">strong impressions</span></>,
    subtitle: "Silk, chiffon and breezy cotton — fabrics that feel as good as they look.",
    primaryHref: "/category/women",
    primaryLabel: "Explore Women",
    secondaryHref: "/category/girls",
    secondaryLabel: "Shop Girls",
  },
  {
    image: hero3,
    badge: "Little Stars",
    title: <>Festive looks <br className="hidden sm:block" /><span className="italic font-light">your kids will love</span></>,
    subtitle: "From baby onesies to sparkly party dresses — comfort meets celebration.",
    primaryHref: "/category/kids",
    primaryLabel: "Shop Kids",
    secondaryHref: "/category/boys",
    secondaryLabel: "Shop Boys",
  },
];

export const HeroCarousel = () => {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI(p => (p + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, []);

  const s = slides[i];

  return (
    <section className="relative w-full h-[100svh] min-h-[560px] overflow-hidden bg-foreground">
      {/* Background image stack with crossfade */}
      {slides.map((slide, k) => (
        <img
          key={k}
          src={slide.image}
          alt={`GRM Elite Wear hero — ${slide.primaryLabel}`}
          className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-[1200ms] ease-out ${k === i ? "opacity-100" : "opacity-0"}`}
          loading={k === 0 ? "eager" : "lazy"}
          fetchPriority={k === 0 ? "high" : "low"}
        />
      ))}

      {/* Left-side gradient overlay only */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent md:from-black/65 md:via-black/25 md:to-transparent" />
      {/* Subtle bottom fade for legibility on mobile */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/50 to-transparent md:hidden" />

      {/* Content */}
      <div className="relative h-full container flex items-center">
        <div key={`text-${i}`} className="max-w-2xl text-white space-y-6 animate-fade-up py-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-medium tracking-wide">
            <Sparkles className="h-3.5 w-3.5" />
            {s.badge}
          </div>
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] font-bold leading-[1.02] tracking-tight text-balance drop-shadow-lg">
            {s.title}
          </h1>
          <p className="text-base md:text-lg text-white/85 max-w-xl leading-relaxed">
            {s.subtitle}
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              to={s.primaryHref}
              className="group inline-flex items-center gap-2 bg-white text-foreground px-8 py-4 rounded-full font-medium hover:bg-primary hover:text-primary-foreground transition-smooth shadow-elegant hover:-translate-y-0.5"
            >
              {s.primaryLabel}
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-smooth" />
            </Link>
            <Link
              to={s.secondaryHref}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/40 text-white px-8 py-4 rounded-full font-medium hover:bg-white hover:text-foreground transition-smooth hover:-translate-y-0.5"
            >
              {s.secondaryLabel}
            </Link>
          </div>

          <div className="flex items-center gap-6 pt-4 text-xs text-white/80">
            <div className="flex items-center gap-1.5">
              <Star className="h-3.5 w-3.5 fill-white text-white" />
              <strong className="text-white">4.8</strong> · 2,400+ reviews
            </div>
            <div>📦 Pan-India shipping</div>
          </div>

          {/* Slide indicators */}
          <div className="flex items-center gap-2 pt-6">
            {slides.map((_, k) => (
              <button
                key={k}
                onClick={() => setI(k)}
                aria-label={`Go to slide ${k + 1}`}
                className={`h-1.5 rounded-full transition-all ${k === i ? "w-10 bg-white" : "w-5 bg-white/40 hover:bg-white/70"}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1.5 text-white/70 text-[10px] tracking-[0.2em] uppercase">
        <span>Scroll</span>
        <div className="h-8 w-px bg-white/40 animate-pulse" />
      </div>
    </section>
  );
};
