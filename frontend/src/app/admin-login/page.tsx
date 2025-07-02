"use client"

import { useState } from "react";



export default function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");

    const login = async () => {
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      setMsg("Logged in successfully");
      window.location.href = "/admin"; // redirect to sqladmin dashboard
    } else {
      const data = await res.json();
      setMsg(data.detail || "Login failed");
    }
  };

    return (
        <>
            <section className="flex items-center justify-center py-12">
              <div className="relative card hover-lift-aura max-w-md w-full p-8 bg-transparent shadow-md">
                <h2 className="text-2xl font-semibold mb-6 text-left">Admin Login</h2>
                <form className="space-y-6 text-left">

                  {/* Email */}
                  <div className="flex flex-col">
                    <label htmlFor="email" className="mb-1 text-sm font-medium text-secondary-500">Email</label>
                    <input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="input input-bordered w-full"
                    />
                  </div>

                  {/* Password */}
                  <div className="flex flex-col">
                    <label htmlFor="password" className="mb-1 text-sm font-medium text-secondary-500">Password</label>
                    <input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      className="input input-bordered w-full"
                    />
                  </div>

                  {/* Button */}
                  <div>
                    <button
                      type="button"
                      onClick={login}
                      className="btn-cta-hover hover-lift-aura w-full"
                    >
                      Login
                    </button>
                  </div>
                </form>

                {/* Optional message */}
                {msg && <p className="mt-4 text-center text-sm text-red-500">{msg}</p>}
              </div>
</section>

        </>
        );
    }






