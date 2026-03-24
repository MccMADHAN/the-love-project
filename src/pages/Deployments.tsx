import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, Globe, Plus, Clock, Loader2 } from "lucide-react";

interface Deployment {
  id: string;
  slug: string;
  title: string | null;
  prompt: string | null;
  url: string | null;
  created_at: string;
}

export default function Deployments() {
  const [deployments, setDeployments] = useState<Deployment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("deployments")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setDeployments((data as Deployment[]) || []);
        setLoading(false);
      });
  }, []);

  const timeAgo = (date: string) => {
    const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
    if (seconds < 60) return "just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-primary" />
              <h1 className="text-lg font-semibold">Deployments</h1>
            </div>
          </div>
          <Button asChild variant="default" size="sm" className="gap-1.5">
            <Link to="/builder">
              <Plus className="w-3.5 h-3.5" />
              New site
            </Link>
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 max-w-4xl">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
          </div>
        ) : deployments.length === 0 ? (
          <div className="text-center py-20">
            <Globe className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">No deployments yet</h2>
            <p className="text-muted-foreground text-sm mb-6">
              Generate a website and deploy it for free to get started.
            </p>
            <Button asChild variant="default">
              <Link to="/builder">
                <Plus className="w-4 h-4 mr-1.5" />
                Create your first site
              </Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {deployments.map((dep) => (
              <div
                key={dep.id}
                className="group border border-border rounded-xl p-4 hover:border-primary/30 hover:bg-muted/30 transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                      <h3 className="font-medium text-sm truncate">
                        {dep.title || "Untitled Site"}
                      </h3>
                    </div>
                    {dep.prompt && (
                      <p className="text-xs text-muted-foreground truncate ml-4 mb-2">
                        {dep.prompt}
                      </p>
                    )}
                    <div className="flex items-center gap-3 ml-4">
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {timeAgo(dep.created_at)}
                      </span>
                      <span className="text-xs font-mono text-muted-foreground/70">
                        {dep.slug}
                      </span>
                    </div>
                  </div>
                  {dep.url && (
                    <a
                      href={dep.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0"
                    >
                      <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                        Visit
                        <ExternalLink className="w-3 h-3" />
                      </Button>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
