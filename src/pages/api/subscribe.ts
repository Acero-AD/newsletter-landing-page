import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  const data = await request.json();
  const { email } = data;

  if (!email) {
    return new Response(JSON.stringify({ success: false, message: 'Email is required' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  const response = await fetch(`https://api.beehiiv.com/v2/publications/${import.meta.env.BEEHIIV_PUBLICATION_ID}/subscriptions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${import.meta.env.BEEHIIV_API_KEY}`
    },
    body: JSON.stringify({
      email: email,
      reactivate_existing: false,
      send_welcome_email: true
    })
  });

  if (response.status === 201) {
    return new Response(JSON.stringify({ success: true, message: 'Subscription successful' }), {
      status: 201,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } else {
    return new Response(JSON.stringify({ success: false, message: 'Subscription failed' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};
