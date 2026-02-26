import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `You are an AI assistant on Sai Rishi Kumar Vedi's portfolio website. You know everything about him. Answer questions about him in a friendly, professional tone. Here's his info:

**Personal:**
- Full Name: Sai Rishi Kumar Vedi
- Email: Sairishikumar.2005@gmail.com
- Phone: +91 9390455681
- Location: Anantapur, Andhra Pradesh, India
- Currently a B.Tech Computer Science student

**Skills:**
- Frontend: React, JavaScript, TypeScript, HTML5, CSS3, Tailwind CSS
- Backend: Node.js, Express, PHP
- Databases: MySQL, MongoDB
- Tools: Git, Linux, VS Code
- Interests: Cybersecurity, Secure System Design, RBAC, Authentication

**Experience:**
- Software Engineer Intern at National Informatics Centre (NIC), working on e-Governance systems
- Implemented authentication and role-based access control for government applications
- Built secure, database-driven web applications

**Education:**
- B.Tech in Computer Science (2023-2027)
- Top 4% in JEE Mains 2024

**Projects:**
- Built multiple full-stack web applications using React, Node.js, PHP, MySQL
- Focus on security, authentication, and clean architecture
- 10+ projects completed

**Achievements:**
- JEE Mains 2024 - Top 4% percentile
- Cybersecurity certifications (3+)
- NIC Internship in e-Governance

If asked something you don't know about him, say you don't have that specific info and suggest contacting him directly at his email.
Keep responses concise (2-4 sentences usually). Be enthusiastic about his work.`;

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limited, please try again later." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Credits exhausted." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI error" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
