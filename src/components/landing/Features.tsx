import { useScrollReveal } from "./useScrollReveal";
import { Cpu, GitBranch, Globe, Layers, Lock, Wand2 } from "lucide-react";

const features = [
  {
    icon: Wand2,
    title: "Prompt to production",
    description: "Describe your app in plain English. Our AI writes clean, maintainable code you can actually ship.",
  },
  {
    icon: Globe,
    title: "One-click deploy",
    description: "Push your app live to a custom domain in seconds. SSL, CDN, and hosting — all handled.",
  },
  {
    icon: Layers,
    title: "Full-stack built in",
    description: "Database, auth, storage, and serverless functions. No third-party accounts to juggle.",
  },
  {
    icon: GitBranch,
    title: "GitHub sync",
    description: "Every change is version-controlled. Clone, branch, and collaborate like any real project.",
  },
  {
    icon: Lock,
    title: "Enterprise-grade security",
    description: "Row-level security, encrypted secrets, and SOC 2 compliant infrastructure from day one.",
  },
  {
    icon: Cpu,
    title: "AI that learns your codebase",
    description: "Context-aware suggestions that understand your design system, data model, and patterns.",
  },
];

export function Features() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="features" className="py-24 md:py-32" ref={ref}>
      <div className="container mx-auto px-6">
        <div className={`text-center max-w-2xl mx-auto mb-16 ${isVisible ? "animate-reveal-up" : "opacity-0"}`}>
          <p className="text-sm font-medium text-primary tracking-wide uppercase mb-3">Capabilities</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Everything you need to ship fast
          </h2>
          <p className="text-muted-foreground text-lg">
            From idea to production in a single tool. No stitching services together.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className={`group relative p-8 rounded-2xl bg-card border border-border/60 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 ${
                isVisible ? "animate-reveal-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${150 + i * 80}ms` }}
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/15 transition-colors">
                <feature.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
