import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X, ArrowUpRight, Clock, Tag, Package, Layers } from "lucide-react";
import { categories, products } from "@/data/catalog";

type Hit =
  | { kind: "product"; id: string; name: string; sub: string; price: number; image: string; href: string }
  | { kind: "category"; id: string; name: string; sub: string; href: string }
  | { kind: "subcategory"; id: string; name: string; sub: string; href: string };

const RECENT_KEY = "grm_recent_searches";

export const SearchModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const [q, setQ] = useState("");
  const [recent, setRecent] = useState<string[]>([]);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setQ("");
      setTimeout(() => inputRef.current?.focus(), 50);
      try { setRecent(JSON.parse(localStorage.getItem(RECENT_KEY) || "[]")); } catch { setRecent([]); }
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const hits = useMemo<Hit[]>(() => {
    const term = q.trim().toLowerCase();
    if (!term) return [];
    const results: Hit[] = [];

    categories.forEach(c => {
      if (c.name.toLowerCase().includes(term) || c.tagline.toLowerCase().includes(term))
        results.push({ kind: "category", id: c.slug, name: c.name, sub: c.tagline, href: `/category/${c.slug}` });
      c.subcategories.forEach(sc => {
        if (sc.toLowerCase().includes(term))
          results.push({ kind: "subcategory", id: `${c.slug}-${sc}`, name: sc, sub: `in ${c.name}`, href: `/category/${c.slug}?sub=${encodeURIComponent(sc)}` });
      });
    });

    products.forEach(p => {
      if (
        p.name.toLowerCase().includes(term) ||
        p.subcategory.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term)
      ) {
        results.push({ kind: "product", id: p.id, name: p.name, sub: `${p.subcategory} · ₹${p.price}`, price: p.price, image: p.image, href: `/product/${p.id}` });
      }
    });

    return results.slice(0, 12);
  }, [q]);

  const persistRecent = (term: string) => {
    const next = [term, ...recent.filter(r => r !== term)].slice(0, 5);
    setRecent(next);
    localStorage.setItem(RECENT_KEY, JSON.stringify(next));
  };

  const go = (href: string, term?: string) => {
    if (term) persistRecent(term);
    onClose();
    navigate(href);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const term = q.trim();
    if (!term) return;
    if (hits[0]) return go(hits[0].href, term);
    persistRecent(term);
    onClose();
    navigate(`/category/women?q=${encodeURIComponent(term)}`);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center px-3 sm:px-6 pt-[8vh] animate-fade-in">
      <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" onClick={onClose} aria-hidden />
      <div className="relative w-full max-w-2xl bg-background rounded-3xl shadow-elegant border border-border overflow-hidden animate-scale-in">
        <form onSubmit={submit} className="flex items-center gap-3 px-5 py-4 border-b border-border">
          <Search className="h-5 w-5 text-muted-foreground" />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search dresses, kurtas, kids wear, categories…"
            className="flex-1 bg-transparent outline-none text-base placeholder:text-muted-foreground"
          />
          <button type="button" onClick={onClose} aria-label="Close" className="h-8 w-8 rounded-full hover:bg-secondary flex items-center justify-center">
            <X className="h-4 w-4" />
          </button>
        </form>

        <div className="max-h-[60vh] overflow-y-auto">
          {!q.trim() ? (
            <div className="p-5 space-y-5">
              {recent.length > 0 && (
                <div>
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5"><Clock className="h-3.5 w-3.5"/>Recent searches</div>
                  <div className="flex flex-wrap gap-2">
                    {recent.map(r => (
                      <button key={r} onClick={() => setQ(r)} className="px-3 py-1.5 rounded-full bg-secondary text-sm hover:bg-accent transition-smooth">{r}</button>
                    ))}
                  </div>
                </div>
              )}
              <div>
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5"><Tag className="h-3.5 w-3.5"/>Popular</div>
                <div className="flex flex-wrap gap-2">
                  {["Maxi Dress", "Kurta", "Kids Party", "Anarkali", "Frock", "Tops", "Jeans"].map(t => (
                    <button key={t} onClick={() => setQ(t)} className="px-3 py-1.5 rounded-full border border-border text-sm hover:border-primary hover:text-primary transition-smooth">{t}</button>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Browse categories</div>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map(c => (
                    <button key={c.slug} onClick={() => go(`/category/${c.slug}`)} className="flex items-center justify-between p-3 rounded-xl bg-secondary hover:bg-accent transition-smooth text-left">
                      <span className="font-medium">{c.name}</span>
                      <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : hits.length === 0 ? (
            <div className="p-10 text-center">
              <div className="mx-auto h-14 w-14 rounded-full bg-secondary flex items-center justify-center mb-3"><Search className="h-6 w-6 text-muted-foreground"/></div>
              <div className="font-display text-lg font-semibold mb-1">No results for "{q}"</div>
              <p className="text-sm text-muted-foreground">Try a different keyword, or browse our categories.</p>
              <div className="flex flex-wrap gap-2 justify-center mt-4">
                {categories.map(c => (
                  <button key={c.slug} onClick={() => go(`/category/${c.slug}`)} className="px-3 py-1.5 rounded-full bg-secondary text-sm">{c.name}</button>
                ))}
              </div>
            </div>
          ) : (
            <ul className="py-2">
              {hits.map(h => (
                <li key={`${h.kind}-${h.id}`}>
                  <button onClick={() => go(h.href, q.trim())} className="w-full flex items-center gap-3 px-5 py-3 hover:bg-secondary transition-smooth text-left">
                    {h.kind === "product" ? (
                      <img src={h.image} alt="" className="h-12 w-12 rounded-lg object-cover" />
                    ) : (
                      <div className="h-12 w-12 rounded-lg bg-gradient-primary flex items-center justify-center text-primary-foreground">
                        {h.kind === "category" ? <Layers className="h-5 w-5"/> : <Package className="h-5 w-5"/>}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{h.name}</div>
                      <div className="text-xs text-muted-foreground truncate capitalize">{h.kind} · {h.sub}</div>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground shrink-0" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="px-5 py-3 border-t border-border bg-secondary/40 text-[11px] text-muted-foreground flex justify-between">
          <span>Press <kbd className="px-1.5 py-0.5 bg-background rounded border border-border">Enter</kbd> to search</span>
          <span><kbd className="px-1.5 py-0.5 bg-background rounded border border-border">Esc</kbd> to close</span>
        </div>
      </div>
    </div>
  );
};
