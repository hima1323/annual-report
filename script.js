// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const oauthLoginButton = document.getElementById('oauthLoginButton');

    // Add an event listener to handle form submission
    loginForm.addEventListener('submit', function (event) {
        // Get the username and password input fields
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Validate the form fields
        if (username === "" || password === "") {
            // Prevent form submission if any field is empty
            event.preventDefault();
            alert("Both username and password are required.");
        } else {
            // If everything is okay, the form will be submitted (you can also add further logic here)
            alert("Form submitted successfully!");
        }
    });

    // Add an event listener to handle OAuth login
    oauthLoginButton.addEventListener('click', function () {
        // Redirect to the OAuth provider's login page
        const clientId = 'YOUR_CLIENT_ID';
        const redirectUri = 'YOUR_REDIRECT_URI';
        const scope = 'YOUR_SCOPES';
        const authUrl = `https://oauth-provider.com/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`;
        
        window.location.href = authUrl;
    });

    // Handle OAuth callback
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code) {
        // Exchange the authorization code for an access token
        fetch('https://oauth-provider.com/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                client_id: 'YOUR_CLIENT_ID',
                client_secret: 'YOUR_CLIENT_SECRET',
                code: code,
                redirect_uri: 'YOUR_REDIRECT_URI',
                grant_type: 'authorization_code'
            })
        })
        .then(response => response.json())
        .then(data => {
            // Handle the access token (e.g., store it, use it to make API requests)
            console.log('Access Token:', data.access_token);
        })
        .catch(error => console.error('Error:', error));
    }
});