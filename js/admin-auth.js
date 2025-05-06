document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Hash the password client-side before sending (using SHA-256)
    hashPassword(password).then(hashedPassword => {
        // In a real application, you would send this to a server for verification
        // For this example, we'll use a hardcoded hashed password
        
        // Pre-computed SHA-256 hash of your password (replace with your actual hashed password)
        const correctHash = '24b9c21effd53c3ef7abc4c2c806a4608645b1863d6ef11056da5182c3244c63'; // Replace this with your actual hashed password
        
        if(username === 'admin' && hashedPassword === correctHash) {
            // Store session token in localStorage
            const token = generateToken();
            localStorage.setItem('adminAuthToken', token);
            
            // Redirect to admin panel
            window.location.href = 'admin-panel.html';
        } else {
            document.getElementById('errorMessage').textContent = 'Invalid username or password';
        }
    });
});

async function hashPassword(password) {
    // Encode the password as UTF-8
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    
    // Hash the password with SHA-256
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    
    // Convert the hash to a hex string
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    
    return hashHex;
}

function generateToken() {
    // Generate a simple token - in production use a more secure method
    return 'admin_' + Math.random().toString(36).substring(2) + Date.now().toString(36);
}