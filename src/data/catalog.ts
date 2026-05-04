import womenImg from "@/assets/cat-women.jpg";
import kidsImg from "@/assets/cat-kids.jpg";
import boysImg from "@/assets/cat-boys.jpg";
import girlsImg from "@/assets/cat-girls.jpg";

export type Category = {
  slug: string;
  name: string;
  tagline: string;
  image: string;
  subcategories: string[];
};

export const categories: Category[] = [
  {
    slug: "women",
    name: "Women",
    tagline: "Elegance redefined",
    image: womenImg,
    subcategories: ["Dresses", "Tops", "Ethnic Wear", "Casual Wear"],
  },
  {
    slug: "kids",
    name: "Kids",
    tagline: "Playful & comfy",
    image: kidsImg,
    subcategories: ["Baby Wear", "Toddler Wear", "Party Wear"],
  },
  {
    slug: "boys",
    name: "Boys",
    tagline: "Cool & casual",
    image: boysImg,
    subcategories: ["T-Shirts", "Shirts", "Jeans", "Shorts"],
  },
  {
    slug: "girls",
    name: "Girls",
    tagline: "Sweet styles",
    image: girlsImg,
    subcategories: ["Frocks", "Tops", "Skirts", "Party Wear"],
  },
];

export type Product = {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  subcategory: string;
  image: string;
  description: string;
  rating: number;
  reviews: number;
  badge?: "New" | "Bestseller" | "Sale";
  stock: number;
};

const img = (seed: string) =>
  `https://images.unsplash.com/${seed}?w=800&h=1000&fit=crop&q=80`;

export const products: Product[] = [
  // Women
  { id: "w1", name: "Blush Chiffon Maxi Dress", price: 1899, originalPrice: 2499, category: "women", subcategory: "Dresses", image: img("photo-1572804013309-59a88b7e92f1"), description: "Flowing chiffon maxi in soft blush. Perfect for evenings and celebrations. Lined for comfort with a flattering empire waist.", rating: 4.8, reviews: 124, badge: "Bestseller", stock: 12 },
  { id: "w2", name: "Floral Embroidered Kurta", price: 1299, category: "women", subcategory: "Ethnic Wear", image: img("photo-1583391733956-3750e0ff4e8b"), description: "Hand-embroidered cotton kurta with intricate floral motifs. Breathable and elegant.", rating: 4.7, reviews: 89, badge: "New", stock: 18 },
  { id: "w3", name: "Silk Pastel Top", price: 999, originalPrice: 1399, category: "women", subcategory: "Tops", image: img("photo-1591047139829-d91aecb6caea"), description: "Lightweight silk top in a delicate pastel palette. Versatile for office or weekend.", rating: 4.6, reviews: 56, badge: "Sale", stock: 24 },
  { id: "w4", name: "Casual Linen Shirt", price: 1199, category: "women", subcategory: "Casual Wear", image: img("photo-1551803091-e20673f15770"), description: "Crisp linen shirt with relaxed fit. Stays cool all day.", rating: 4.5, reviews: 42, stock: 30 },
  { id: "w5", name: "Anarkali Festive Gown", price: 3499, originalPrice: 4299, category: "women", subcategory: "Ethnic Wear", image: img("photo-1610030469983-98e550d6193c"), description: "Floor-length anarkali in pastel tones with delicate zari work.", rating: 4.9, reviews: 201, badge: "Bestseller", stock: 7 },
  { id: "w6", name: "Wrap Midi Dress", price: 1599, category: "women", subcategory: "Dresses", image: img("photo-1496747611176-843222e1e57c"), description: "Universally flattering wrap silhouette in a flowy fabric.", rating: 4.6, reviews: 78, stock: 15 },

  // Kids
  { id: "k1", name: "Baby Cotton Onesie Set", price: 599, category: "kids", subcategory: "Baby Wear", image: img("photo-1522771930-78848d9293e8"), description: "Set of 3 super-soft cotton onesies. Gentle on baby skin.", rating: 4.9, reviews: 312, badge: "Bestseller", stock: 50 },
  { id: "k2", name: "Toddler Romper Pink", price: 799, originalPrice: 999, category: "kids", subcategory: "Toddler Wear", image: img("photo-1519278409-1f56fdda7fe5"), description: "Adorable pink romper with frills and snap closure for easy diaper changes.", rating: 4.7, reviews: 145, badge: "Sale", stock: 22 },
  { id: "k3", name: "Kids Party Tutu Dress", price: 1299, category: "kids", subcategory: "Party Wear", image: img("photo-1518831959646-742c3a14ebf7"), description: "Sparkly tutu party dress that twirls beautifully.", rating: 4.8, reviews: 98, badge: "New", stock: 14 },

  // Boys
  { id: "b1", name: "Classic Cotton Tee", price: 499, category: "boys", subcategory: "T-Shirts", image: img("photo-1503944583220-79d8926ad5e2"), description: "Soft cotton tee in essential colors. Great everyday basic.", rating: 4.6, reviews: 87, stock: 60 },
  { id: "b2", name: "Slim Fit Denim Jeans", price: 1199, originalPrice: 1499, category: "boys", subcategory: "Jeans", image: img("photo-1542272604-787c3835535d"), description: "Stretch denim with slim fit and reinforced knees.", rating: 4.7, reviews: 65, badge: "Sale", stock: 28 },
  { id: "b3", name: "Casual Check Shirt", price: 899, category: "boys", subcategory: "Shirts", image: img("photo-1620799140408-edc6dcb6d633"), description: "Smart-casual check shirt for school and outings.", rating: 4.5, reviews: 41, stock: 35 },
  { id: "b4", name: "Summer Cargo Shorts", price: 699, category: "boys", subcategory: "Shorts", image: img("photo-1503341504253-dff4815485f1"), description: "Lightweight cargo shorts with multiple pockets.", rating: 4.4, reviews: 33, badge: "New", stock: 40 },

  // Girls
  { id: "g1", name: "Pink Ruffle Frock", price: 1099, category: "girls", subcategory: "Frocks", image: img("photo-1518831959646-742c3a14ebf7"), description: "Tiered ruffle frock in dreamy pink. Feels princess-perfect.", rating: 4.8, reviews: 156, badge: "Bestseller", stock: 20 },
  { id: "g2", name: "Pleated Mini Skirt", price: 699, category: "girls", subcategory: "Skirts", image: img("photo-1583391733981-8498408dd2c6"), description: "Pleated A-line skirt with elastic waist for comfort.", rating: 4.6, reviews: 52, stock: 32 },
  { id: "g3", name: "Sequin Party Dress", price: 1799, originalPrice: 2199, category: "girls", subcategory: "Party Wear", image: img("photo-1518831959646-742c3a14ebf7"), description: "Sparkling sequin dress, perfect for birthdays and parties.", rating: 4.9, reviews: 188, badge: "Sale", stock: 9 },
  { id: "g4", name: "Cute Printed Top", price: 549, category: "girls", subcategory: "Tops", image: img("photo-1518831959646-742c3a14ebf7"), description: "Soft cotton top with adorable prints.", rating: 4.5, reviews: 27, stock: 45 },
];

export const testimonials = [
  { name: "Priya R.", location: "Chennai", text: "Beautiful fabrics and the fit is perfect! My daughter loves the frock collection.", rating: 5 },
  { name: "Anjali M.", location: "Ranipet", text: "Fast delivery and quality way better than I expected. Already on my third order.", rating: 5 },
  { name: "Sneha K.", location: "Bangalore", text: "GRM Elite Wear is now my go-to for ethnic wear. The detailing is gorgeous.", rating: 5 },
];

export const faqs = [
  { q: "What is the best online clothing store in India?", a: "GRM Elite Wear offers trendy and affordable fashion for women and kids across India, with carefully curated collections of dresses, ethnic wear, and kidswear." },
  { q: "Do you ship across India?", a: "Yes, we ship pan-India via India Post and ST Courier. Tamil Nadu orders typically arrive within 2-3 business days." },
  { q: "What payment options do you accept?", a: "We support UPI, debit/credit cards, net banking, and Cash on Delivery (COD) across all serviceable pincodes." },
  { q: "How do I track my order?", a: "Once shipped you'll receive a tracking number. Use the Track Order page to view live status." },
  { q: "What is your return policy?", a: "Easy 7-day returns on unused items with original tags. Initiate a return from your account or contact our support." },
];

export const getProduct = (id: string) => products.find(p => p.id === id);
export const getCategory = (slug: string) => categories.find(c => c.slug === slug);
export const getProductsByCategory = (slug: string) => products.filter(p => p.category === slug);
