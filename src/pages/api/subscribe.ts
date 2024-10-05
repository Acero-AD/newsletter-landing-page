import type { APIRoute } from 'astro';

export const post: APIRoute = async ({ request }) => {
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

  try {
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

    const responseData = await response.json();

    if (responseData.success) {
      return new Response(JSON.stringify({ success: true, message: 'Subscription successful' }), {
        status: 200,
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
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ success: false, message: 'An error occurred' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};
