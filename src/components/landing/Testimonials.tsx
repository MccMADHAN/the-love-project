import { useScrollReveal } from "./useScrollReveal";

const testimonials = [
  {
    quote: "I shipped a client project in 2 days that would have taken 2 weeks. My margins have never been better.",
    name: "Mariana Castillo",
    role: "Freelance developer",
    initials: "MC",
  },
  {
    quote: "As a non-technical founder, this is the first tool that actually let me build what I imagined. Not a template — my product.",
    name: "David Okonkwo",
    role: "CEO, Liftboard",
    initials: "DO",
  },
  {
    quote: "The code quality surprised me. Clean components, proper TypeScript, sensible architecture. I'd hire this AI.",
    name: "Sofia Andersen",
    role: "Staff Engineer, Meridian",
    initials: "SA",
  },
];

export function Testimonials() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="testimonials" className="py-24 md:py-32" ref={ref}>
      <div className="container mx-auto px-6">
        <div className={`text-center max-w-2xl mx-auto mb-16 ${isVisible ? "animate-reveal-up" : "opacity-0"}`}>
          <p className="text-sm font-medium text-primary tracking-wide uppercase mb-3">Testimonials</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Loved by builders everywhere
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className={`p-8 rounded-2xl bg-card border border-border/60 flex flex-col ${
                isVisible ? "animate-reveal-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${200 + i * 100}ms` }}
            >
              <blockquote className="text-foreground/90 leading-relaxed flex-1 mb-6">
                "{t.quote}"
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-semibold">
                  {t.initials}
                </div>
                <div>
                  <p className="font-medium text-sm">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
