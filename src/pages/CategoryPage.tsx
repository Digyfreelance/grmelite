import { useParams, Link } from "react-router-dom";
import { useMemo, useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { ProductCard } from "@/components/ProductCard";
import { getCategory, getProductsByCategory } from "@/data/catalog";
import NotFound from "./NotFound";
import { SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

const CategoryPage = () => {
  const { slug = "" } = useParams();
  const category = getCategory(slug);
  const all = getProductsByCategory(slug);
  const [sub, setSub] = useState<string | null>(null);
  const [sort, setSort] = useState("featured");
  const [maxPrice, setMaxPrice] = useState(5000);

  useEffect(() => {
    if (category) document.title = `${category.name}'s Fashion Collection | GRM Elite Wear`;
  }, [category]);

  const filtered = useMemo(() => {
    let list = all.filter(p => p.price <= maxPrice);
    if (sub) list = list.filter(p => p.subcategory === sub);
    if (sort === "low") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "high") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [all, sub, sort, maxPrice]);

  if (!category) return <NotFound />;

  return (
    <Layout>
      <section className="bg-gradient-hero">
        <div className="container py-12 md:py-16">
          <nav className="text-xs text-muted-foreground mb-3"><Link to="/" className="hover:text-primary">Home</Link> / <span className="text-foreground">{category.name}</span></nav>
          <h1 className="font-display text-4xl md:text-6xl font-bold">{category.name}'s Fashion</h1>
          <p className="text-muted-foreground mt-3 max-w-xl">{category.tagline} — {filtered.length} products</p>
        </div>
      </section>

      <div className="container py-10 grid lg:grid-cols-[260px_1fr] gap-8">
        <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
          <div>
            <h3 className="font-display font-semibold mb-3 flex items-center gap-2"><SlidersHorizontal className="h-4 w-4"/>Subcategory</h3>
            <div className="flex flex-wrap lg:flex-col gap-2">
              <button onClick={() => setSub(null)} className={cn("text-left text-sm px-3 py-2 rounded-full lg:rounded-lg transition-smooth border", !sub ? "bg-foreground text-background border-foreground" : "border-border hover:border-primary")}>All</button>
              {category.subcategories.map(s => (
                <button key={s} onClick={() => setSub(s)} className={cn("text-left text-sm px-3 py-2 rounded-full lg:rounded-lg transition-smooth border", sub === s ? "bg-foreground text-background border-foreground" : "border-border hover:border-primary")}>{s}</button>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-display font-semibold mb-3">Max price: ₹{maxPrice}</h3>
            <input type="range" min={300} max={5000} step={100} value={maxPrice} onChange={e => setMaxPrice(+e.target.value)} className="w-full accent-primary"/>
          </div>
        </aside>

        <div>
          <div className="flex items-center justify-between mb-6">
            <span className="text-sm text-muted-foreground">{filtered.length} results</span>
            <select value={sort} onChange={e => setSort(e.target.value)} className="h-10 px-4 rounded-full border border-border bg-background text-sm">
              <option value="featured">Featured</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
              <option value="rating">Top rated</option>
            </select>
          </div>
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">No products match your filters.</div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {filtered.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CategoryPage;
