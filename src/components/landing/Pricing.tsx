import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useScrollReveal } from "./useScrollReveal";

const plans = [
  {
    name: "Starter",
    price: "$0",
    period: "forever",
    description: "Perfect for side projects and learning",
    features: ["5 projects", "Community support", "Basic AI generation", "Deploy to subdomain"],
    cta: "Get started",
    featured: false,
  },
  {
    name: "Pro",
    price: "$20",
    period: "/month",
    description: "For professionals shipping real products",
    features: ["Unlimited projects", "Priority support", "Advanced AI models", "Custom domains", "GitHub sync", "Team collaboration"],
    cta: "Start free trial",
    featured: true,
  },
  {
    name: "Teams",
    price: "$49",
    period: "/month",
    description: "For teams building at scale",
    features: ["Everything in Pro", "5 team members", "Shared design systems", "Admin controls", "SSO & audit logs"],
    cta: "Contact sales",
    featured: false,
  },
];

export function Pricing() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="pricing" className="py-24 md:py-32 bg-card" ref={ref}>
      <div className="container mx-auto px-6">
        <div className={`text-center max-w-2xl mx-auto mb-16 ${isVisible ? "animate-reveal-up" : "opacity-0"}`}>
          <p className="text-sm font-medium text-primary tracking-wide uppercase mb-3">Pricing</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-muted-foreground text-lg">Start free. Upgrade when you're ready.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <div
              key={plan.name}
              className={`relative p-8 rounded-2xl border flex flex-col ${
                plan.featured
                  ? "bg-foreground text-background border-foreground shadow-2xl shadow-foreground/20 scale-[1.02]"
                  : "bg-background border-border/60"
              } ${isVisible ? "animate-reveal-up" : "opacity-0"}`}
              style={{ animationDelay: `${200 + i * 100}ms` }}
            >
              {plan.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                  Most popular
                </span>
              )}
              <h3 className="font-semibold text-xl mb-1">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-4xl font-bold tabular-nums">{plan.price}</span>
                <span className={`text-sm ${plan.featured ? "text-background/60" : "text-muted-foreground"}`}>
                  {plan.period}
                </span>
              </div>
              <p className={`text-sm mb-6 ${plan.featured ? "text-background/70" : "text-muted-foreground"}`}>
                {plan.description}
              </p>
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm">
                    <Check className={`w-4 h-4 flex-shrink-0 ${plan.featured ? "text-primary" : "text-primary"}`} />
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                variant={plan.featured ? "hero" : "hero-outline"}
                className="w-full rounded-xl h-11"
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
