import { Layout } from "@/components/layout/Layout";
import { Mail, MapPin, Phone } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";

const Contact = () => {
  useEffect(() => { document.title = "Contact GRM Elite Wear | Customer Support"; }, []);
  return (
    <Layout>
      <section className="bg-gradient-hero">
        <div className="container py-14 md:py-20 text-center">
          <h1 className="font-display text-4xl md:text-6xl font-bold">Contact us</h1>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">We'd love to hear from you. Drop us a message and our team will get back within 24 hours.</p>
        </div>
      </section>
      <div className="container py-14 grid md:grid-cols-[1fr_320px] gap-10 max-w-5xl">
        <form onSubmit={(e) => { e.preventDefault(); (e.target as HTMLFormElement).reset(); toast.success("Message sent! We'll be in touch soon."); }}
          className="bg-card p-6 md:p-8 rounded-3xl shadow-soft space-y-4">
          <div className="grid sm:grid-cols-2 gap-3">
            <input required maxLength={100} placeholder="Your name" className="h-11 px-4 rounded-lg border border-border bg-background"/>
            <input required type="email" maxLength={255} placeholder="Email" className="h-11 px-4 rounded-lg border border-border bg-background"/>
          </div>
          <input placeholder="Subject" maxLength={150} className="h-11 px-4 rounded-lg border border-border bg-background w-full"/>
          <textarea required maxLength={1000} rows={6} placeholder="How can we help?" className="px-4 py-3 rounded-lg border border-border bg-background w-full"/>
          <button className="h-12 px-7 rounded-full bg-gradient-primary text-primary-foreground font-medium shadow-elegant hover:opacity-90 transition-smooth">Send message</button>
        </form>
        <aside className="space-y-5">
          {[
            { icon: MapPin, t: "Visit", v: "Ranipet, Tamil Nadu, India" },
            { icon: Mail, t: "Email", v: "support@grmelitewear.com" },
            { icon: Phone, t: "Call", v: "+91-XXXXXXXXXX" },
          ].map((c, i) => (
            <div key={i} className="bg-gradient-soft p-5 rounded-2xl flex gap-4">
              <div className="h-10 w-10 rounded-full bg-background flex items-center justify-center shrink-0"><c.icon className="h-5 w-5 text-primary"/></div>
              <div><div className="font-display font-semibold">{c.t}</div><div className="text-sm text-muted-foreground">{c.v}</div></div>
            </div>
          ))}
        </aside>
      </div>
    </Layout>
  );
};
export default Contact;
