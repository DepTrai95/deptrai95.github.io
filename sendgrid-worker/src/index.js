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
    try {
      // CORS-Preflight-Request behandeln
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

      // API-Key abrufen und Request-Body parsen
      const sendgridApiKey = env.SENDGRID_API_KEY;
      if (!sendgridApiKey) {
        throw new Error("SENDGRID_API_KEY is not defined in environment variables");
      }

      const requestBody = await request.json().catch(() => {
        throw new Error("Invalid JSON body");
      });

      const { to, name, email, subject, text } = requestBody;

      // Prüfen, ob alle erforderlichen Felder vorhanden sind
      if (!to || !name || !email || !subject || !text) {
        return new Response(
          JSON.stringify({ error: "All fields (to, name, email, subject, text) are required." }),
          { status: 400, headers: { 'Access-Control-Allow-Origin': 'https://ducanhnguyen.de', 'Content-Type': 'application/json' } }
        );
      }

      // E-Mail-Daten erstellen
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

      // E-Mail über SendGrid senden
      const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${sendgridApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailData),
      });

      // Fehler abfangen, falls SendGrid eine Antwort mit Fehlerstatus zurückgibt
      if (!response.ok) {
        console.error("SendGrid error:", response.statusText);
        throw new Error(`Failed to send email: ${response.statusText}`);
      }

      // Erfolgreiche Antwort zurückgeben
      return new Response(JSON.stringify({ message: "Email erfolgreich verschickt" }), {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': 'https://ducanhnguyen.de',
          'Content-Type': 'application/json'
        },
      });

    } catch (error) {
      console.error("Error:", error.message);
      return new Response(JSON.stringify({ error: error.message || "Fehler beim Versenden der E-Mail!" }), {
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': 'https://ducanhnguyen.de',
          'Content-Type': 'application/json'
        },
      });
    }
  },
};
