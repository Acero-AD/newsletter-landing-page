interface SubscriptionResponse {
    success: boolean;
    [key: string]: any; 
  }

function showSnackbar(message: string, type: 'success' | 'error') {
  const snackbar = document.getElementById('snackbar') as HTMLDivElement;
  if (!snackbar) {
    return;
  }

  snackbar.textContent = message;
  snackbar.className = `
    fixed top-5 left-1/2 transform
    transform -translate-x-1/2 min-w-[250px] p-4 rounded-md
    text-white text-center transition-opacity duration-300 ${
      type === 'success' ? 'bg-black/50' : 'bg-red-300'
    }`;

  snackbar.classList.remove('hidden', 'opacity-0');
  snackbar.classList.add('opacity-100');

  setTimeout(() => {
    snackbar.classList.add('opacity-0');
    setTimeout(() => {
      snackbar.classList.add('hidden');
    }, 300);
  }, 5000);
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
    showSnackbar('Please enter your email address', 'error');
    return;
  }

  subscribeUser(email)
    .then(data => {
      if (data.success) {
        showSnackbar('Bienvenido a la comunidad!', 'success');
        emailField.value = ''; // Clear the email field
      } else {
        showSnackbar('Oh Oh.., algo ha ido mal', 'error');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      showSnackbar('Oh Oh.., algo ha ido mal', 'error');
    });
}

// Attach the function to the form submit event
const form = document.getElementById('subscribe-form') as HTMLFormElement;
if (form) {
  form.addEventListener('submit', handleSubscription);
}

