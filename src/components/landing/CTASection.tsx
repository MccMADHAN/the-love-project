import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollReveal } from "./useScrollReveal";

export function CTASection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-24 md:py-32" ref={ref}>
      <div className="container mx-auto px-6">
        <div
          className={`max-w-3xl mx-auto text-center ${isVisible ? "animate-reveal-up" : "opacity-0"}`}
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
            Ready to build something?
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-lg mx-auto">
            Join thousands of creators shipping real products every day. Your next idea is one prompt away.
          </p>
          <Button variant="hero" size="lg" className="text-base px-10 h-13 rounded-xl" asChild>
            <Link to="/builder">
              Start building for free
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
