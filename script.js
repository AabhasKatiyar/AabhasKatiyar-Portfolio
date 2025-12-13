/* Portfolio Script - Debug Version */

let isLoginMode = true;

function toggleMode() {
    isLoginMode = !isLoginMode;
    const title = document.getElementById('form-title');
    const btn = document.getElementById('submit-btn');
    const toggleText = document.getElementById('toggle-text');
    const toggleLink = document.getElementById('toggle-link');
    const errorMsg = document.getElementById('error-msg');
    const successMsg = document.getElementById('success-msg');

    // Reset messages
    errorMsg.style.display = 'none';
    successMsg.style.display = 'none';

    if (isLoginMode) {
        title.innerText = "Login";
        btn.innerText = "Login";
        toggleText.innerText = "New here?";
        toggleLink.innerText = "Create an account";
    } else {
        title.innerText = "Create Account";
        btn.innerText = "Sign Up";
        toggleText.innerText = "Already have an account?";
        toggleLink.innerText = "Login here";
    }
}

function handleAuth(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMsg = document.getElementById('error-msg');
    const successMsg = document.getElementById('success-msg');

    if(!email || !password) {
        errorMsg.style.display = 'block';
        errorMsg.innerText = "Please fill in all fields.";
        return;
    }

    if (isLoginMode) {
        // --- LOGIN LOGIC ---
        const storedUser = localStorage.getItem(email);
        
        if (storedUser) {
            const userData = JSON.parse(storedUser);
            
            if (password === userData.password) {
                // SUCCESS: We found the user and password matches
                alert("Login Successful! Redirecting to main.html...");
                window.location.href = "main.html"; 
            } else {
                errorMsg.style.display = 'block';
                errorMsg.innerText = "Incorrect password.";
            }
        } else {
            // FAIL: User tried to login without signing up first
            errorMsg.style.display = 'block';
            errorMsg.innerText = "User not found! Click 'Create an account' first.";
        }

    } else {
        // --- SIGN UP LOGIC ---
        if (localStorage.getItem(email)) {
            errorMsg.style.display = 'block';
            errorMsg.innerText = "Account already exists. Please login.";
            return;
        }

        // Save user
        localStorage.setItem(email, JSON.stringify({ email, password }));
        
        alert("Account Created! Now please Log In.");
        
        successMsg.style.display = 'block';
        successMsg.innerText = "Account created! Switching to login...";
        errorMsg.style.display = 'none';

        setTimeout(() => {
            toggleMode();
            successMsg.style.display = 'none';
            document.getElementById('email').value = "";
            document.getElementById('password').value = "";
        }, 1000);
    }
}

// --- BLOG LOGIC ---
const blogContainer = document.getElementById('blog-container');
if(blogContainer) {
    const posts = [
        { title: "Switched to JS", date: "Oct 12", content: "Learning DOM manipulation..." },
        { title: "ESP32 Project", date: "Sept 28", content: "Working with microcontrollers..." },
        { title: "Portfolio Design", date: "Aug 15", content: "Building this site from scratch..." }
    ];
    posts.forEach(post => {
        const article = document.createElement('article');
        article.className = 'blog-post';
        article.innerHTML = `<h2>${post.title}</h2><div class="blog-date">${post.date}</div><p>${post.content}</p>`;
        blogContainer.appendChild(article);
    });
}