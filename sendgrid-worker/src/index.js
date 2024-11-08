/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
  async fetch(request, env) {
    // OPTIONS (Preflight) request für CORS behandeln
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': 'https://ducanhnguyen.de', // Erlaubte Frontend-Domain
          'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    }

    // Nur POST-Anfragen erlauben
    if (request.method !== "POST") {
      return new Response("Only POST requests are allowed", { status: 405 });
    }

    const sendgridApiKey = env.SENDGRID_API_KEY; // Cloudflare Pages Environment Variable
    const { to, name, email, subject, text } = await request.json();

    // E-Mail-Daten gemäß SendGrid-API-Format aufbauen
    const emailData = {
      personalizations: [
        {
          to: [{ email: to }],
        },
      ],
      from: {
        email: "contact@deptrai.de",
        name: name,
      },
      subject: subject,
      content: [
        {
          type: "text/plain",
          value: text,
        },
      ],
      reply_to: {
        email: email,
        name: name,
      },
    };

    try {
      // E-Mail über die SendGrid-API senden
      const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${sendgridApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailData),
      });

      if (!response.ok) {
        console.error("SendGrid error:", response.statusText);
        throw new Error("Failed to send email");
      }

      console.log("Email erfolgreich verschickt.");
      return new Response(JSON.stringify({ message: "Email erfolgreich verschickt" }), {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': 'https://ducanhnguyen.de', // CORS-Header hinzufügen
          'Content-Type': 'application/json'
        }
      });
    } catch (error) {
      console.error("Error:", error);
      return new Response(JSON.stringify({ error: "Fehler beim Versenden der E-Mail!" }), {
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': 'https://ducanhnguyen.de', // CORS-Header hinzufügen
          'Content-Type': 'application/json'
        }
      });
    }
  },
};
