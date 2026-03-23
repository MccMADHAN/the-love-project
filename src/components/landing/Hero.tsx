import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import heroMockup from "@/assets/hero-mockup.png";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.05),transparent_60%)]" />

      <div className="container mx-auto px-6 relative">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 animate-reveal-up">
            <Sparkles className="w-3.5 h-3.5" />
            Now with AI-powered code generation
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-6 animate-reveal-up delay-100">
            Turn your ideas into
            <span className="text-primary"> real software</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed animate-reveal-up delay-200">
            Describe what you want. Watch it build. Ship in minutes.
            No coding required — but developers love it too.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-reveal-up delay-300">
            <Button variant="hero" size="lg" className="text-base px-8 h-12 rounded-xl" asChild>
              <Link to="/builder">
                Start building for free
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
            <Button variant="hero-outline" size="lg" className="text-base px-8 h-12 rounded-xl">
              Watch demo
            </Button>
          </div>

          {/* Social proof */}
          <p className="text-sm text-muted-foreground mt-8 animate-reveal-up delay-400">
            Trusted by <span className="font-semibold text-foreground">28,000+</span> builders worldwide
          </p>
        </div>

        {/* Hero image */}
        <div className="mt-16 md:mt-20 animate-reveal-up delay-500">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-foreground/10 border border-border/60">
            <img
              src={heroMockup}
              alt="Buildly app builder interface showing code editor and live preview"
              className="w-full"
              loading="eager"
            />
            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-foreground/5" />
          </div>
        </div>
      </div>
    </section>
  );
}
