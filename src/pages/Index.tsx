import { Link } from "react-router-dom";
import { ArrowRight, Truck, Shield, RefreshCw, Sparkles, Star } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { ProductCard } from "@/components/ProductCard";
import { HeroCarousel } from "@/components/HeroCarousel";
import { categories, products, testimonials, faqs } from "@/data/catalog";
import { useEffect } from "react";

const Index = () => {
  const bestSellers = products.filter(p => p.badge === "Bestseller").slice(0, 4);
  const newArrivals = products.filter(p => p.badge === "New").concat(products.filter(p => !p.badge)).slice(0, 4);

  useEffect(() => {
    document.title = "Trendy Fashion for Women, Kids & More | GRM Elite Wear";
    const meta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
      if (!el) { el = document.createElement("meta"); el.name = name; document.head.appendChild(el); }
      el.content = content;
    };
    meta("description", "Shop trendy women's dresses, ethnic wear, and stylish kids clothing online at GRM Elite Wear. Affordable fashion delivered across India from Ranipet, Tamil Nadu.");
    meta("keywords", "online fashion store India, women clothing online, kids wear India, ethnic wear, fashion store Tamil Nadu, online dress shop Ranipet");
  }, []);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="container relative grid lg:grid-cols-2 gap-8 items-center py-16 md:py-24 lg:py-32">
          <div className="space-y-6 animate-fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-background/80 backdrop-blur border border-border text-xs font-medium">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              New Season · Up to 40% off
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold leading-[1.05] tracking-tight text-balance">
              Upgrade your style with <span className="bg-gradient-primary bg-clip-text text-transparent">GRM Elite Wear</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-md leading-relaxed">
              Curated fashion for women & kids — soft fabrics, modern silhouettes, festive elegance. Made for every occasion.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/category/women" className="group inline-flex items-center gap-2 bg-foreground text-background px-7 py-3.5 rounded-full font-medium hover:bg-primary transition-smooth shadow-elegant">
                Shop Women <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-smooth"/>
              </Link>
              <Link to="/category/kids" className="inline-flex items-center gap-2 bg-background border border-border px-7 py-3.5 rounded-full font-medium hover:border-primary transition-smooth">
                Shop Kids
              </Link>
            </div>
            <div className="flex items-center gap-6 pt-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1"><Star className="h-3.5 w-3.5 fill-primary text-primary"/><strong className="text-foreground">4.8</strong> · 2,400+ reviews</div>
              <div>📦 Pan-India shipping</div>
            </div>
          </div>
          <div className="relative animate-scale-in">
            <div className="absolute -inset-8 bg-gradient-primary opacity-20 blur-3xl rounded-full" />
            <img src={heroImg} alt="GRM Elite Wear featured fashion" width={1600} height={900}
              className="relative rounded-3xl shadow-elegant w-full object-cover aspect-[4/5] lg:aspect-[5/6]" />
            <div className="absolute -bottom-4 -left-4 bg-background rounded-2xl shadow-card p-4 hidden md:flex items-center gap-3 animate-float">
              <div className="h-10 w-10 rounded-full bg-gradient-primary flex items-center justify-center"><Sparkles className="h-5 w-5 text-primary-foreground"/></div>
              <div><div className="text-xs text-muted-foreground">Today's drop</div><div className="font-display font-semibold text-sm">Pastel Edit ✨</div></div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-y border-border bg-background">
        <div className="container grid grid-cols-2 md:grid-cols-4 gap-6 py-6 text-sm">
          {[
            { icon: Truck, t: "Free Shipping", s: "Above ₹999" },
            { icon: RefreshCw, t: "Easy Returns", s: "7-day policy" },
            { icon: Shield, t: "Secure Payment", s: "UPI, COD & cards" },
            { icon: Sparkles, t: "Premium Quality", s: "Curated fabrics" },
          ].map((f, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center"><f.icon className="h-5 w-5 text-primary"/></div>
              <div><div className="font-semibold">{f.t}</div><div className="text-xs text-muted-foreground">{f.s}</div></div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="container py-16 md:py-24">
        <div className="flex items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-sm text-primary font-medium mb-2">Shop by category</p>
            <h2 className="font-display text-3xl md:text-5xl font-bold">Find your fit</h2>
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((c, i) => (
            <Link key={c.slug} to={`/category/${c.slug}`}
              className="group relative aspect-[3/4] rounded-3xl overflow-hidden shadow-soft hover:shadow-elegant transition-smooth animate-fade-up"
              style={{ animationDelay: `${i * 80}ms` }}>
              <img src={c.image} alt={c.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-background">
                <div className="text-xs opacity-80 mb-1">{c.tagline}</div>
                <div className="font-display text-2xl md:text-3xl font-bold flex items-center justify-between">
                  {c.name}
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-smooth"/>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Best sellers */}
      <section className="container py-12 md:py-16">
        <div className="flex items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-sm text-primary font-medium mb-2">Loved by everyone</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold">Best Sellers</h2>
          </div>
          <Link to="/category/women" className="text-sm font-medium hover:text-primary transition-smooth hidden sm:inline-flex items-center gap-1">View all <ArrowRight className="h-4 w-4"/></Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {bestSellers.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* New arrivals */}
      <section className="container py-12 md:py-16">
        <div className="flex items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-sm text-primary font-medium mb-2">Just landed</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold">New Arrivals</h2>
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {newArrivals.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gradient-soft py-16 md:py-24 mt-12">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-sm text-primary font-medium mb-2">Customer love</p>
            <h2 className="font-display text-3xl md:text-5xl font-bold">What they're saying</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-background p-7 rounded-2xl shadow-soft">
                <div className="flex gap-0.5 mb-3">{Array.from({length: t.rating}).map((_,k)=><Star key={k} className="h-4 w-4 fill-primary text-primary"/>)}</div>
                <p className="text-sm leading-relaxed mb-4">"{t.text}"</p>
                <div className="text-sm"><strong>{t.name}</strong> <span className="text-muted-foreground">· {t.location}</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container py-16 md:py-24">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-sm text-primary font-medium mb-2">FAQ</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold">Got questions?</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <details key={i} className="group bg-card rounded-2xl border border-border p-5 [&_svg]:open:rotate-45">
                <summary className="flex items-center justify-between cursor-pointer font-medium">
                  {f.q}
                  <span className="h-7 w-7 rounded-full bg-secondary flex items-center justify-center transition-transform">
                    <span className="block h-3 w-3 relative before:absolute before:inset-x-0 before:top-1/2 before:h-0.5 before:bg-foreground after:absolute after:inset-y-0 after:left-1/2 after:w-0.5 after:bg-foreground"/>
                  </span>
                </summary>
                <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="container pb-16 md:pb-24">
        <div className="rounded-3xl bg-gradient-primary p-10 md:p-16 text-center text-primary-foreground shadow-elegant relative overflow-hidden">
          <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-white/10 blur-2xl"/>
          <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-white/10 blur-2xl"/>
          <div className="relative max-w-xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">Join the GRM family</h2>
            <p className="opacity-90 mb-6">Get 10% off your first order, plus early access to new drops and exclusive offers.</p>
            <form onSubmit={(e) => { e.preventDefault(); (e.target as HTMLFormElement).reset(); import("sonner").then(({toast}) => toast.success("Welcome! Check your inbox for your code.")); }}
              className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input required type="email" placeholder="your@email.com"
                className="flex-1 h-12 px-5 rounded-full bg-background text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-background"/>
              <button className="h-12 px-7 rounded-full bg-foreground text-background font-medium hover:opacity-90 transition-smooth">Subscribe</button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
