interface SubscriptionResponse {
    success: boolean;
    [key: string]: any; 
  }

  // Define a helper function to handle the actual subscription logic
  async function subscribeUser(email: string): Promise<SubscriptionResponse> {
    const response = await fetch('/api/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email })
    });

    if (!response.ok) {
      throw new Error('Failed to subscribe');
    }

    return response.json();
  }

  // Define the form submit handler as a separate function
  function handleSubscription(e: Event): void {
    e.preventDefault();
    
    const emailField = document.getElementById('email') as HTMLInputElement;
    const email = emailField?.value;

    if (!email) {
      alert('Please enter your email address.');
      return;
    }

    subscribeUser(email)
      .then(data => {
        if (data.success) {
          alert('Thank you for subscribing!');
          emailField.value = ''; // Clear the email field
        } else {
          alert('Oops! Something went wrong.');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
      });
  }

  // Attach the function to the form submit event
  const form = document.getElementById('subscribe-form') as HTMLFormElement;
  if (form) {
    form.addEventListener('submit', handleSubscription);
  }

