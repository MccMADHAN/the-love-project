import { useScrollReveal } from "./useScrollReveal";

const steps = [
  {
    number: "01",
    title: "Describe your vision",
    description: "Type what you want in plain language. Upload designs, sketches, or reference links for extra clarity.",
  },
  {
    number: "02",
    title: "Watch it build in real time",
    description: "See your app take shape with live preview. Make changes by chatting — iterate as fast as you think.",
  },
  {
    number: "03",
    title: "Ship it to the world",
    description: "Deploy with one click. Connect your domain, invite collaborators, and start getting users.",
  },
];

export function HowItWorks() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="how-it-works" className="py-24 md:py-32 bg-card" ref={ref}>
      <div className="container mx-auto px-6">
        <div className={`text-center max-w-2xl mx-auto mb-20 ${isVisible ? "animate-reveal-up" : "opacity-0"}`}>
          <p className="text-sm font-medium text-primary tracking-wide uppercase mb-3">How it works</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Three steps. Zero friction.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-12 md:gap-8 max-w-4xl mx-auto">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className={`relative ${isVisible ? "animate-reveal-up" : "opacity-0"}`}
              style={{ animationDelay: `${200 + i * 120}ms` }}
            >
              <span className="font-mono text-5xl font-bold text-primary/15 leading-none block mb-4">
                {step.number}
              </span>
              <h3 className="font-semibold text-xl mb-3">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
