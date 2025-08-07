"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import "./styles.css";

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
      <div className="login-container">
        <h2 className="cyber-title text-2xl font-bold mb-6 text-center">System Access</h2>
        <div className="mb-6 text-center">
          <div className="inline-block p-3 rounded-full bg-cyber-dark border-2 border-cyber-accent mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-cyber-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative">
            <input
              type="text"
              className="cyber-input pl-10"
              placeholder="Username"
              name="username"
              value={loginForm.username}
              onChange={handleLoginForm}
              required
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-cyber-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div className="relative">
            <input
              type="password"
              className="cyber-input pl-10"
              placeholder="Password"
              name="password"
              value={loginForm.password}
              onChange={handleLoginForm}
              required
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-cyber-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <button type="submit" className="cyber-btn">
            Access System
          </button>
        </form>
      </div>
    </div>
  );
}
