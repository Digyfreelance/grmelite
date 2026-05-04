import { useLocation } from "react-router-dom";
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Package, Truck, CheckCircle2, Search } from "lucide-react";

const STAGES = [
  { key: "received", label: "Order received", icon: Package },
  { key: "packed", label: "Packed", icon: Package },
  { key: "shipped", label: "Shipped", icon: Truck },
  { key: "delivered", label: "Delivered", icon: CheckCircle2 },
];

const Track = () => {
  const loc = useLocation() as { state?: { id?: string } };
  const [id, setId] = useState(loc.state?.id || "");
  const [shown, setShown] = useState<string | null>(loc.state?.id || null);

  const stage = shown ? (parseInt(shown.replace(/\D/g, "").slice(-1) || "1", 10) % 4) : 0;

  return (
    <Layout>
      <section className="bg-gradient-hero">
        <div className="container py-14 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold">Track your order</h1>
          <p className="text-muted-foreground mt-3">Enter your order ID or tracking number</p>
        </div>
      </section>
      <div className="container py-12 max-w-2xl">
        <form onSubmit={(e) => { e.preventDefault(); setShown(id); }} className="flex gap-2 mb-10">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"/>
            <input value={id} onChange={e => setId(e.target.value)} required placeholder="GRM12345678 or tracking number"
              className="w-full h-12 pl-11 pr-4 rounded-full border border-border bg-background"/>
          </div>
          <button className="h-12 px-7 rounded-full bg-gradient-primary text-primary-foreground font-medium shadow-elegant">Track</button>
        </form>
        {shown && (
          <div className="bg-card rounded-3xl shadow-soft p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <div><div className="text-xs text-muted-foreground">Order ID</div><div className="font-display font-bold text-lg">{shown}</div></div>
              <div className="text-right"><div className="text-xs text-muted-foreground">Carrier</div><div className="font-medium text-sm">India Post</div></div>
            </div>
            <ol className="relative">
              {STAGES.map((s, i) => {
                const active = i <= stage;
                return (
                  <li key={s.key} className="flex gap-4 pb-6 last:pb-0">
                    <div className="flex flex-col items-center">
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center transition-smooth ${active ? "bg-gradient-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`}>
                        <s.icon className="h-5 w-5"/>
                      </div>
                      {i < STAGES.length - 1 && <div className={`w-0.5 flex-1 mt-2 ${active ? "bg-primary" : "bg-border"}`}/>}
                    </div>
                    <div className="pb-4">
                      <div className={`font-display font-semibold ${active ? "" : "text-muted-foreground"}`}>{s.label}</div>
                      <div className="text-xs text-muted-foreground">{active ? "Completed" : "Pending"}</div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        )}
      </div>
    </Layout>
  );
};
export default Track;
