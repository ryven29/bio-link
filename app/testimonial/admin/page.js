"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import "../../styles.css";

export default function AdminLogin() {
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const router = useRouter();

  const handleLoginForm = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginForm.username === "admin" && loginForm.password === "admin123") {
      localStorage.setItem('isAdmin', 'true');
      router.push('/testi');
    } else {
      alert("Invalid credentials!");
    }
  };

  return (
    <div className="cyberpunk-bg min-h-screen flex items-center justify-center p-4">
      <div className="login-container max-w-md w-full">
        <h2 className="cyber-title text-2xl font-bold mb-6 text-center">Admin Access</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            className="cyber-input w-full"
            placeholder="Username"
            name="username"
            value={loginForm.username}
            onChange={handleLoginForm}
            required
          />
          <input
            type="password"
            className="cyber-input w-full"
            placeholder="Password"
            name="password"
            value={loginForm.password}
            onChange={handleLoginForm}
            required
          />
          <button type="submit" className="cyber-btn w-full">Access System</button>
        </form>
      </div>
    </div>
  );
}
