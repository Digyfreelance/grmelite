import { Link } from "react-router-dom";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { Product } from "@/data/catalog";
import { useShop } from "@/context/ShopContext";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export const ProductCard = ({ product }: { product: Product }) => {
  const { addToCart, toggleWishlist, inWishlist } = useShop();
  const wished = inWishlist(product.id);
  const off = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

  return (
    <div className="group relative bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-card transition-smooth">
      <Link to={`/product/${product.id}`} className="block aspect-[4/5] overflow-hidden bg-muted">
        <img src={product.image} alt={product.name} loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      </Link>
      <div className="absolute top-3 left-3 flex flex-col gap-1.5">
        {product.badge && (
          <span className={cn("text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full",
            product.badge === "New" && "bg-accent text-accent-foreground",
            product.badge === "Bestseller" && "bg-primary text-primary-foreground",
            product.badge === "Sale" && "bg-destructive text-destructive-foreground")}>
            {product.badge}
          </span>
        )}
        {off > 0 && <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-foreground text-background">-{off}%</span>}
      </div>
      <button
        onClick={(e) => { e.preventDefault(); toggleWishlist(product.id); toast.success(wished ? "Removed from wishlist" : "Added to wishlist"); }}
        className="absolute top-3 right-3 h-9 w-9 rounded-full bg-background/90 backdrop-blur flex items-center justify-center hover:bg-background transition-smooth"
        aria-label="Wishlist">
        <Heart className={cn("h-4 w-4 transition-smooth", wished && "fill-primary text-primary")} />
      </button>
      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-display font-medium text-sm line-clamp-1 group-hover:text-primary transition-smooth">{product.name}</h3>
        </Link>
        <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
          <Star className="h-3 w-3 fill-primary text-primary" />
          <span>{product.rating}</span>
          <span>· {product.reviews}</span>
        </div>
        <div className="mt-2 flex items-end justify-between gap-2">
          <div className="flex items-baseline gap-2">
            <span className="font-display font-bold text-base">₹{product.price}</span>
            {product.originalPrice && <span className="text-xs text-muted-foreground line-through">₹{product.originalPrice}</span>}
          </div>
          <button
            onClick={(e) => { e.preventDefault(); addToCart(product); toast.success("Added to cart"); }}
            className="h-9 w-9 rounded-full bg-foreground text-background flex items-center justify-center hover:bg-primary transition-smooth"
            aria-label="Add to cart">
            <ShoppingBag className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
