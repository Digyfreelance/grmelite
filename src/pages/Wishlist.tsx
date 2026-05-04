import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { useShop } from "@/context/ShopContext";
import { products } from "@/data/catalog";
import { ProductCard } from "@/components/ProductCard";
import { Heart } from "lucide-react";

const Wishlist = () => {
  const { wishlist } = useShop();
  const items = products.filter(p => wishlist.includes(p.id));

  return (
    <Layout>
      <div className="container py-10 md:py-14">
        <h1 className="font-display text-3xl md:text-4xl font-bold mb-8">My Wishlist</h1>
        {items.length === 0 ? (
          <div className="text-center py-20">
            <Heart className="h-14 w-14 mx-auto text-muted-foreground mb-4"/>
            <p className="text-muted-foreground mb-6">Your wishlist is empty. Start saving favorites!</p>
            <Link to="/" className="inline-block bg-foreground text-background px-7 py-3 rounded-full font-medium hover:bg-primary transition-smooth">Explore</Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {items.map(p => <ProductCard key={p.id} product={p}/>)}
          </div>
        )}
      </div>
    </Layout>
  );
};
export default Wishlist;
