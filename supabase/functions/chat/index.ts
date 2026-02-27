import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `You are an AI-style assistant on Sai Rishi Kumar Vedi's portfolio website. You know everything about him from the fixed profile below and never hallucinate extra facts.

Answer in a friendly, professional tone. Always talk in the first person as if you are Rishi speaking about yourself ("I", "my"), not in third person.

If the user asks something that is not about Rishi, briefly answer that you only know about his profile and redirect the conversation back to his skills, experience, or projects.

Here is Rishi's profile:

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

function buildAnswer(question: string): string {
  const q = question.toLowerCase();

  if (q.includes("nic") || q.includes("intern")) {
    return "I worked as a web development intern at the National Informatics Centre (NIC), where I built secure, database‑driven e‑Governance modules in PHP and MySQL and implemented authentication and role‑based access control. That experience gave me hands‑on exposure to real government systems and enterprise‑style workflows.";
  }

  if (q.includes("skill")) {
    return "My core skills are full‑stack web development and secure system design. On the frontend I use React, TypeScript, Tailwind CSS, and modern UI libraries, and on the backend I work with Node.js, Express, PHP, and databases like MySQL and MongoDB. I’m especially interested in authentication, RBAC, and cybersecurity‑focused architectures.";
  }

  if (q.includes("project") || q.includes("portfolio")) {
    return "I’ve built more than ten projects, including an AI‑assisted raw‑material marketplace, an academia certificate authenticator, an internship and placement portal, and several PHP‑MySQL management systems. This portfolio showcases those projects along with my NIC internship and cybersecurity‑oriented work.";
  }

  if (q.includes("education") || q.includes("college") || q.includes("b.tech")) {
    return "I’m pursuing a B.Tech in Computer Science at JNTU Anantapur from 2023 to 2027. Earlier, I completed my MPC intermediate at Narayana Junior College and secured a top‑4% percentile in JEE Mains 2024.";
  }

  if (q.includes("contact") || q.includes("email") || q.includes("reach")) {
    return "You can reach me at Sairishikumar.2005@gmail.com or on my GitHub profile Rishi-212005. I’m open to internships, projects, and collaborations around full‑stack development and cybersecurity.";
  }

  return "I’m Rishi’s AI assistant for this portfolio. I can tell you about my skills, projects, education, NIC internship, and interests in full‑stack development and cybersecurity. Ask me anything about those, or if you need something specific you can always reach me at Sairishikumar.2005@gmail.com.";
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const userMessage =
      Array.isArray(messages) && messages.length
        ? String(messages[messages.length - 1].content ?? "")
        : "";

    const baseAnswer = buildAnswer(userMessage);
    const answer = `${baseAnswer}\n\n${SYSTEM_PROMPT.includes("Sai Rishi Kumar Vedi") ? "" : ""}`.trim();

    const payload = {
      choices: [
        {
          delta: {
            content: answer,
          },
        },
      ],
    };

    const body =
      `data: ${JSON.stringify(payload)}\n\n` +
      `data: [DONE]\n\n`;

    return new Response(body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(
      JSON.stringify({
        error: e instanceof Error ? e.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});
