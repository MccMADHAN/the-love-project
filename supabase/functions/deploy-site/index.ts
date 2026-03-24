import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { html } = await req.json();
    if (!html) throw new Error("HTML content is required");

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Generate a unique slug
    const slug = crypto.randomUUID().slice(0, 8);
    const filePath = `${slug}/index.html`;

    // Upload HTML to storage
    const { error: uploadError } = await supabase.storage
      .from("deployed-sites")
      .upload(filePath, new Blob([html], { type: "text/html" }), {
        contentType: "text/html",
        cacheControl: "3600",
      });

    if (uploadError) throw uploadError;

    // Save deployment record
    await supabase.from("deployments").insert({ slug });

    // Get public URL
    const { data: urlData } = supabase.storage
      .from("deployed-sites")
      .getPublicUrl(filePath);

    return new Response(
      JSON.stringify({ url: urlData.publicUrl, slug }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.error("deploy-site error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Deploy failed" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
