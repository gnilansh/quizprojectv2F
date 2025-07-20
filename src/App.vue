<template>
  <div class="container">
    <h1>🌟 Quiz Master V2</h1>

    <!-- Login Form -->
    <div v-if="showLogin" class="form-box">
      <h2>User Login</h2>
      <input type="text" placeholder="Email" v-model="login.email" />
      <input type="password" placeholder="Password" v-model="login.password" />
      <button @click="handleLogin">Login</button>
      <a @click="showLogin = false" class="switch">Create Account</a>
      <p class="error">{{ message }}</p>
    </div>

    <!-- Register Form -->
    <div v-else class="form-box">
      <h2>Register</h2>
      <input type="text" placeholder="Full Name" v-model="register.full_name" />
      <input type="email" placeholder="Email" v-model="register.email" />
      <input type="password" placeholder="Password" v-model="register.password" />
      <input type="text" placeholder="Qualification" v-model="register.qualification" />
      <input type="date" v-model="register.dob" />
      <button @click="handleRegister">Sign Up</button>
      <a @click="showLogin = true" class="switch">Back to Login</a>
      <p class="error">{{ message }}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      showLogin: true,
      message: "",
      login: { email: "", password: "" },
      register: {
        full_name: "",
        email: "",
        password: "",
        qualification: "",
        dob: ""
      }
    };
  },
  methods: {
    isValidEmail(email) {
      return /\S+@\S+\.\S+/.test(email);
    },

    async handleLogin() {
      this.message = "";
      if (!this.login.email || !this.login.password) {
        this.message = "Email and password are required";
        return;
      }

      try {
        const res = await axios.post("/login", this.login);
        this.message = res.data.message || "Login successful!";
        alert("✅ Login successful!");
      } catch (err) {
        console.error("Login error:", err);
        this.message = err.response?.data?.error || "Login failed";
      }
    },

    async handleRegister() {
      this.message = "";

      const r = this.register;
      if (!r.full_name || !r.email || !r.password || !r.qualification || !r.dob) {
        this.message = "Please fill all fields";
        return;
      }

      if (!this.isValidEmail(r.email)) {
        this.message = "Invalid email format";
        return;
      }

      try {
        const res = await axios.post("/register", this.register);
        this.message = res.data.message || "Registered successfully!";
        this.showLogin = true;
      } catch (err) {
        console.error("Registration error:", err);
        this.message = err.response?.data?.error || "Registration failed";
      }
    }
  }
};
</script>

<style>
body {
  margin: 0;
  font-family: "Segoe UI", sans-serif;
  background: linear-gradient(135deg, #6b73ff, #000dff);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.container {
  width: 100%;
  max-width: 400px;
  text-align: center;
}

.form-box {
  background: white;
  color: black;
  padding: 2rem;
  margin-top: 1rem;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

input {
  width: 100%;
  padding: 0.7rem;
  margin: 0.5rem 0;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 1rem;
}

input[type="date"]::-webkit-calendar-picker-indicator {
  filter: invert(0.3);
}

button {
  width: 100%;
  padding: 0.7rem;
  background-color: #6b73ff;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  margin-top: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #4e5fe4;
}

.switch {
  display: block;
  margin-top: 1rem;
  color: #0044cc;
  cursor: pointer;
  text-decoration: underline;
}

.error {
  color: red;
  margin-top: 0.5rem;
  font-weight: bold;
}
</style>
