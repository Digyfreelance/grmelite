import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { ProductCard } from "@/components/ProductCard";
import { getProduct, products } from "@/data/catalog";
import { useShop } from "@/context/ShopContext";
import { Heart, ShoppingBag, Star, Truck, RefreshCw, Shield, Minus, Plus } from "lucide-react";
import NotFound from "./NotFound";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

const ProductDetail = () => {
  const { id = "" } = useParams();
  const product = getProduct(id);
  const { addToCart, toggleWishlist, inWishlist } = useShop();
  const [qty, setQty] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    if (product) {
      document.title = `${product.name} | GRM Elite Wear`;
      const ld = document.getElementById("product-ld") || (() => {
        const s = document.createElement("script"); s.id = "product-ld"; s.type = "application/ld+json"; document.head.appendChild(s); return s;
      })();
      ld.textContent = JSON.stringify({
        "@context": "https://schema.org/", "@type": "Product",
        name: product.name, description: product.description, image: product.image,
        offers: { "@type": "Offer", priceCurrency: "INR", price: product.price, availability: product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: product.rating, reviewCount: product.reviews }
      });
    }
    return () => { document.getElementById("product-ld")?.remove(); };
  }, [product]);

  if (!product) return <NotFound />;
  const wished = inWishlist(product.id);
  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <Layout>
      <div className="container py-8 md:py-12">
        <nav className="text-xs text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary">Home</Link> /{" "}
          <Link to={`/category/${product.category}`} className="hover:text-primary capitalize">{product.category}</Link> /{" "}
          <span className="text-foreground">{product.name}</span>
        </nav>
        <div className="grid lg:grid-cols-2 gap-10">
          <div className="bg-muted rounded-3xl overflow-hidden aspect-[4/5]">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover"/>
          </div>
          <div className="space-y-5">
            <div>
              <div className="text-sm text-muted-foreground capitalize">{product.category} · {product.subcategory}</div>
              <h1 className="font-display text-3xl md:text-4xl font-bold mt-1">{product.name}</h1>
              <div className="flex items-center gap-2 mt-2 text-sm">
                <div className="flex gap-0.5">{Array.from({length: 5}).map((_,i) => (
                  <Star key={i} className={cn("h-4 w-4", i < Math.round(product.rating) ? "fill-primary text-primary" : "text-muted")}/>
                ))}</div>
                <span className="text-muted-foreground">{product.rating} · {product.reviews} reviews</span>
              </div>
            </div>
            <div className="flex items-baseline gap-3">
              <span className="font-display text-3xl font-bold">₹{product.price}</span>
              {product.originalPrice && <>
                <span className="text-muted-foreground line-through">₹{product.originalPrice}</span>
                <span className="text-sm font-medium text-primary">{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% off</span>
              </>}
            </div>
            <p className="text-muted-foreground leading-relaxed">{product.description}</p>
            <div className="text-sm">
              {product.stock > 0
                ? <span className="text-green-600 dark:text-green-400">● In stock ({product.stock} left)</span>
                : <span className="text-destructive">Out of stock</span>}
            </div>
            <div className="flex items-center gap-3 pt-2">
              <div className="flex items-center gap-3 h-12 px-3 rounded-full border border-border">
                <button onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Decrease" className="h-7 w-7 rounded-full hover:bg-secondary flex items-center justify-center"><Minus className="h-4 w-4"/></button>
                <span className="w-6 text-center font-medium">{qty}</span>
                <button onClick={() => setQty(qty + 1)} aria-label="Increase" className="h-7 w-7 rounded-full hover:bg-secondary flex items-center justify-center"><Plus className="h-4 w-4"/></button>
              </div>
              <button onClick={() => { toggleWishlist(product.id); toast.success(wished ? "Removed from wishlist" : "Added to wishlist"); }}
                className={cn("h-12 w-12 rounded-full border border-border flex items-center justify-center hover:border-primary transition-smooth", wished && "bg-primary text-primary-foreground border-primary")}
                aria-label="Wishlist">
                <Heart className={cn("h-5 w-5", wished && "fill-current")}/>
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button onClick={() => { addToCart(product, qty); toast.success("Added to cart"); }}
                className="h-12 px-6 rounded-full border-2 border-foreground font-medium hover:bg-foreground hover:text-background transition-smooth flex items-center justify-center gap-2">
                <ShoppingBag className="h-4 w-4"/>Add to Cart
              </button>
              <button onClick={() => { addToCart(product, qty); navigate("/cart"); }}
                className="h-12 px-6 rounded-full bg-gradient-primary text-primary-foreground font-medium hover:opacity-90 transition-smooth shadow-elegant">
                Buy Now
              </button>
            </div>
            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-border">
              {[{ icon: Truck, t: "Free shipping" }, { icon: RefreshCw, t: "7-day returns" }, { icon: Shield, t: "Secure checkout" }].map((f, i) => (
                <div key={i} className="text-center">
                  <f.icon className="h-5 w-5 mx-auto text-primary mb-1.5"/>
                  <div className="text-xs text-muted-foreground">{f.t}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-20">
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">You may also like</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {related.map(p => <ProductCard key={p.id} product={p}/>)}
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
};

export default ProductDetail;
