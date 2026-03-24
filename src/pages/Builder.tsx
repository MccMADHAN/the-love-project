import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Loader2, Sparkles, ArrowLeft, Code, Eye, Rocket, ExternalLink, Copy, Check, Globe } from "lucide-react";
import { toast } from "sonner";

const GENERATE_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-site`;
const DEPLOY_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/deploy-site`;

export default function Builder() {
  const [prompt, setPrompt] = useState("");
  const [htmlCode, setHtmlCode] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployedUrl, setDeployedUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const generate = useCallback(async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    setHtmlCode("");
    setShowCode(false);

    try {
      const resp = await fetch(GENERATE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ prompt: prompt.trim() }),
      });

      if (!resp.ok) {
        const err = await resp.json().catch(() => ({ error: "Generation failed" }));
        throw new Error(err.error || "Generation failed");
      }

      if (!resp.body) throw new Error("No response body");

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let fullHtml = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, newlineIndex);
          buffer = buffer.slice(newlineIndex + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;
          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              fullHtml += content;
              setHtmlCode(fullHtml);
            }
          } catch {
            buffer = line + "\n" + buffer;
            break;
          }
        }
      }

      // Flush remaining
      if (buffer.trim()) {
        for (let raw of buffer.split("\n")) {
          if (!raw) continue;
          if (raw.endsWith("\r")) raw = raw.slice(0, -1);
          if (!raw.startsWith("data: ")) continue;
          const jsonStr = raw.slice(6).trim();
          if (jsonStr === "[DONE]") continue;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              fullHtml += content;
              setHtmlCode(fullHtml);
            }
          } catch {}
        }
      }
    } catch (e: any) {
      toast.error(e.message || "Something went wrong");
    } finally {
      setIsGenerating(false);
    }
  }, [prompt]);

  const deploy = useCallback(async () => {
    if (!htmlCode) return;
    setIsDeploying(true);
    setDeployedUrl(null);
    try {
      const resp = await fetch(DEPLOY_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ html: htmlCode, title: prompt.trim().slice(0, 60), prompt: prompt.trim() }),
      });
      if (!resp.ok) {
        const err = await resp.json().catch(() => ({ error: "Deploy failed" }));
        throw new Error(err.error || "Deploy failed");
      }
      const data = await resp.json();
      setDeployedUrl(data.url);
      toast.success("Site deployed successfully!");
    } catch (e: any) {
      toast.error(e.message || "Deploy failed");
    } finally {
      setIsDeploying(false);
    }
  }, [htmlCode]);

  const copyUrl = () => {
    if (deployedUrl) {
      navigator.clipboard.writeText(deployedUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const iframeSrcDoc = htmlCode || undefined;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top bar */}
      <header className="h-14 border-b border-border flex items-center justify-between px-4 shrink-0">
        <a href="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </a>
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="font-semibold text-sm">Buildly Studio</span>
        </div>
        <div className="flex items-center gap-2">
          {htmlCode && !isGenerating && (
            <Button
              variant="default"
              size="sm"
              onClick={deploy}
              disabled={isDeploying}
              className="gap-1.5"
            >
              {isDeploying ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  Deploying...
                </>
              ) : (
                <>
                  <Rocket className="w-3.5 h-3.5" />
                  Deploy free
                </>
              )}
            </Button>
          )}
          {htmlCode && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowCode(!showCode)}
              className="gap-1.5"
            >
              {showCode ? <Eye className="w-3.5 h-3.5" /> : <Code className="w-3.5 h-3.5" />}
              {showCode ? "Preview" : "Code"}
            </Button>
          )}
          {!htmlCode && <div />}
        </div>
      </header>

      {/* Deployed URL banner */}
      {deployedUrl && (
        <div className="bg-primary/10 border-b border-primary/20 px-4 py-2.5 flex items-center justify-center gap-3">
          <span className="text-sm font-medium text-primary">🎉 Your site is live!</span>
          <a href={deployedUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-primary underline underline-offset-2 flex items-center gap-1 truncate max-w-xs">
            {deployedUrl.replace(/^https?:\/\//, '').slice(0, 50)}
            <ExternalLink className="w-3 h-3 shrink-0" />
          </a>
          <Button variant="ghost" size="sm" onClick={copyUrl} className="h-7 px-2 gap-1 text-xs">
            {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
            {copied ? "Copied" : "Copy"}
          </Button>
        </div>
      )}

      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Left panel: Prompt */}
        <div className={`${htmlCode ? "lg:w-[380px]" : "max-w-2xl mx-auto w-full"} p-6 flex flex-col ${!htmlCode ? "justify-center" : ""} shrink-0 border-r border-border/50`}>
          {!htmlCode && (
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold tracking-tight mb-2">What do you want to build?</h1>
              <p className="text-muted-foreground text-sm">Describe your website and watch it come to life.</p>
            </div>
          )}
          <div className="space-y-3">
            <Textarea
              placeholder="e.g. A modern portfolio site for a photographer with a dark theme, gallery grid, and contact form..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="min-h-[120px] resize-none text-sm"
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                  e.preventDefault();
                  generate();
                }
              }}
            />
            <Button
              variant="hero"
              className="w-full rounded-xl h-11"
              onClick={generate}
              disabled={isGenerating || !prompt.trim()}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  Generate website
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              Press ⌘+Enter to generate
            </p>
          </div>
        </div>

        {/* Right panel: Preview / Code */}
        {htmlCode && (
          <div className="flex-1 bg-muted/30 relative min-h-[400px]">
            {showCode ? (
              <pre className="p-4 text-xs font-mono overflow-auto h-full text-foreground/80 leading-relaxed">
                {htmlCode}
              </pre>
            ) : (
              <iframe
                srcDoc={iframeSrcDoc}
                title="Generated website preview"
                className="w-full h-full border-0"
                sandbox="allow-scripts"
              />
            )}
            {isGenerating && (
              <div className="absolute top-3 right-3 flex items-center gap-2 bg-background/90 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-border text-xs text-muted-foreground">
                <Loader2 className="w-3 h-3 animate-spin" />
                Generating...
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
