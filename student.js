import { auth } from "../firebase.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

const form = document.getElementById("loginForm");
const message = document.getElementById("loginMessage");

form.addEventListener("submit", async function(e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    // मैसेज को पहले खाली करें
    message.textContent = "";

    try {
        // Firebase लॉगिन का इंतजार करें
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        
        if (userCredential.user) {
            console.log("Login successful, redirecting...");
            // ब्राउज़र को सिंक होने के लिए एक छोटा सा समय दें
            setTimeout(() => {
                window.location.replace("dashboard.html");
            }, 100);
        }
    } catch (error) {
        console.error("Firebase Auth Error:", error);
        
        // अलग-अलग गलतियों के लिए सही मैसेज दिखाएं
        if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
            message.textContent = "Email or password is incorrect.";
        } else {
            message.textContent = "Something went wrong. Please try again.";
        }
    }
});
