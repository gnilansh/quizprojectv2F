const { createApp } = Vue;

createApp({
  data() {
    return {
      screen: 'login', // or 'register' or 'dashboard'
      email: '',
      password: '',
      full_name: '',
      qualification: '',
      dob: '',
      message: ''
    };
  },
  methods: {
    async loginUser() {
      try {
        const res = await fetch('https://66afec29-6c20-4baf-8a1a-f6cee1443d8a-00-3pmv7k9xm73vd.pike.replit.dev/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: this.email, password: this.password })
        });

        const data = await res.json();

        if (res.ok) {
          this.message = '';
          this.full_name = data.user.full_name;
          this.screen = 'dashboard';
        } else {
          this.message = data.error || 'Login failed!';
        }
      } catch (err) {
        this.message = 'Network error.';
      }
    },

    async registerUser() {
      try {
        const res = await fetch('https://66afec29-6c20-4baf-8a1a-f6cee1443d8a-00-3pmv7k9xm73vd.pike.replit.dev/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            full_name: this.full_name,
            email: this.email,
            password: this.password,
            qualification: this.qualification,
            dob: this.dob
          })
        });

        const data = await res.json();

        if (res.ok) {
          this.message = "Registration successful! Please login.";
          this.screen = 'login';
        } else {
          this.message = data.error || 'Registration failed!';
        }
      } catch (err) {
        this.message = 'Network error.';
      }
    },

    logout() {
      this.screen = 'login';
      this.email = this.password = '';
      this.message = '';
    }
  }
}).mount('#app');
