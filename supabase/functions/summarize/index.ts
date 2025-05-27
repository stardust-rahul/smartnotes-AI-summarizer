import { createClient } from "npm:@supabase/supabase-js@2.39.3";
import { VertexAI } from "npm:@google-cloud/vertexai@0.2.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  try {
    const { text } = await req.json();

    if (!text) {
      return new Response(
        JSON.stringify({ error: "Text is required" }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            ...corsHeaders,
          },
        }
      );
    }

    // Initialize Vertex AI
    const projectId = Deno.env.get("GOOGLE_CLOUD_PROJECT");
    const location = "us-central1";

    if (!projectId) {
      throw new Error("GOOGLE_CLOUD_PROJECT environment variable is not set");
    }

    const vertexAI = new VertexAI({
      project: projectId,
      location,
    });

    const model = vertexAI.preview.getGenerativeModel({
      model: "gemini-pro",
    });

    const prompt = `Please provide a concise summary of the following text. Focus on the main points and key takeaways:

${text}

Keep the summary clear and informative while maintaining a professional tone.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const summary = response.candidates[0].content.parts[0].text;

    return new Response(
      JSON.stringify({ summary }),
      {
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error) {
    console.error("Error in summarize function:", error);
    
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "An error occurred while generating the summary",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  }
});