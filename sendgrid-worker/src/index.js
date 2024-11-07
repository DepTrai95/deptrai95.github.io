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
	if (req.method === 'OPTIONS') {
      // Handle OPTIONS (Preflight) request for CORS
      return new Response(null, {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': 'https://deptrai.pages.dev/',  // Allow your frontend domain
          'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    }

	if (request.method !== "POST") {
		return new Response("Only POST requests are allowed", { status: 405 });
	}

	const sendgridApiKey = env.SENDGRID_API_KEY; // Set this in Cloudflare Pages Environment Variables
	const { to, name, email, subject, text } = await request.json();

	// Construct the email data as per SendGrid's API format
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
		// Send the email through the SendGrid API
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

		console.log("Email successfully sent.");
		return new Response(JSON.stringify({ message: "Email successfully sent" }), { status: 200 });
	} catch (error) {
		console.error("Error:", error);
		return new Response(JSON.stringify({ error: "Failed to send email!" }), { status: 500 });
	}
},
};
