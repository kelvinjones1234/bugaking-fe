"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

const SignUpPage = () => {
  // This is your Main component
  const { register, loading, error, clearError } = useAuth();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    password: "",
    password_confirm: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearError();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.password_confirm) {
      alert("Passwords do not match!");
      return;
    }
    await register(formData);
  };

  return (
    // CHANGE 1: min-h-screen -> h-full
    <div className="bg-white text-[#171512] font-sans h-full">
      {/* CHANGE 2: h-screen -> h-full */}
      <div className="flex flex-col lg:flex-row h-full">
        {/* Left Side: Hero Image */}
        {/* Added h-full to ensure image stretches */}
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden h-full">
          <div className="absolute inset-0 z-10 bg-black/40"></div>
          <div
            className="absolute inset-0 z-0 bg-cover bg-center scale-105"
            style={{
              backgroundImage: 'url("/signup_img.jpg")',
            }}
          ></div>

          <div className="relative z-20 flex flex-col justify-between p-16 w-full h-full">
            <div className="max-w-md">
              <h1 className="text-white text-5xl font-black leading-tight mb-6">
                Start Your Land Investment Journey.
              </h1>
              <p className="text-white/80 text-lg font-light leading-relaxed">
                Create an account to invest in farmland and earn reliable annual
                returns through professionally managed agriculture.
              </p>
            </div>

            <div className="text-white/90 text-xs font-bold uppercase tracking-[0.3em]">
              © 2026 BugaKing Group
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        {/* CHANGE 3: Added h-full and overflow-y-auto so ONLY the form scrolls */}
        <div className="flex-1 flex items-center justify-center p-8 sm:p-12 lg:p-20 bg-white h-full overflow-y-auto">
          <div className="w-full max-w-md space-y-8 my-10">
            <div className="space-y-2">
              <h2 className="text-3xl font-black tracking-tight text-[#171512]">
                Create Your Account
              </h2>
              <p className="text-[#171512]/60 text-sm">
                Begin your journey with the world's premier investment group.
              </p>
            </div>

            {/* Errors */}
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
                {Object.keys(error).map((key) => (
                  <div key={key}>
                    <span className="font-bold capitalize">{key}: </span>
                    {Array.isArray(error[key]) ? error[key][0] : error[key]}
                  </div>
                ))}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-black uppercase tracking-widest text-[#171512]/50">
                    First Name
                  </label>
                  <input
                    name="first_name"
                    required
                    value={formData.first_name}
                    onChange={handleChange}
                    className="block w-full border border-gray-200 rounded-lg text-sm px-4 py-3 bg-gray-50 focus:border-[#d0a539] focus:ring-2 focus:ring-[#d0a539] outline-none"
                    placeholder="John"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-black uppercase tracking-widest text-[#171512]/50">
                    Last Name
                  </label>
                  <input
                    name="last_name"
                    required
                    value={formData.last_name}
                    onChange={handleChange}
                    className="block w-full border border-gray-200 rounded-lg text-sm px-4 py-3 bg-gray-50 focus:border-[#d0a539] focus:ring-2 focus:ring-[#d0a539] outline-none"
                    placeholder="Doe"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase tracking-widest text-[#171512]/50">
                  Email Address
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full border border-gray-200 rounded-lg text-sm px-4 py-3 bg-gray-50 focus:border-[#d0a539] focus:ring-2 focus:ring-[#d0a539] outline-none"
                  placeholder="j.doe@example.com"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase tracking-widest text-[#171512]/50">
                  Phone Number
                </label>
                <input
                  name="phone_number"
                  required
                  value={formData.phone_number}
                  onChange={handleChange}
                  className="block w-full border border-gray-200 rounded-lg text-sm px-4 py-3 bg-gray-50 focus:border-[#d0a539] focus:ring-2 focus:ring-[#d0a539] outline-none"
                  placeholder="+2348141772672"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase tracking-widest text-[#171512]/50">
                  Password
                </label>
                <div className="relative">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="block w-full border border-gray-200 rounded-lg text-sm px-4 py-3 bg-gray-50 focus:border-[#d0a539] focus:ring-2 focus:ring-[#d0a539] outline-none"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#171512]/40 hover:text-[#d0a539]"
                  >
                    <span className="text-xs font-bold">
                      {showPassword ? "HIDE" : "SHOW"}
                    </span>
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase tracking-widest text-[#171512]/50">
                  Confirm Password
                </label>
                <input
                  name="password_confirm"
                  type="password"
                  required
                  value={formData.password_confirm}
                  onChange={handleChange}
                  className="block w-full border border-gray-200 rounded-lg text-sm px-4 py-3 bg-gray-50 focus:border-[#d0a539] focus:ring-2 focus:ring-[#d0a539] outline-none"
                  placeholder="••••••••"
                />
              </div>

              <div className="flex items-start gap-3 py-2">
                <input
                  required
                  id="terms"
                  type="checkbox"
                  className="mt-1 rounded border-gray-300 text-[#d0a539] focus:ring-2 focus:ring-[#d0a539]"
                />
                <label
                  className="text-xs leading-relaxed text-[#171512]/60"
                  htmlFor="terms"
                >
                  I agree to the{" "}
                  <a
                    href="#"
                    className="text-[#d0a539] font-bold hover:underline"
                  >
                    Terms of Service
                  </a>
                  .
                </label>
              </div>

              <button
                disabled={loading}
                className="w-full bg-[#d0a539] text-[#171512] font-black uppercase tracking-[0.2em] py-4 rounded-lg hover:bg-opacity-90 transition-all shadow-lg shadow-[#d0a539]/20 disabled:opacity-50"
              >
                {loading ? "Creating..." : "Create Account"}
              </button>
            </form>

            <p className="text-center text-sm text-[#171512]/60">
              Already have an account?{" "}
              <Link
                href="/authentication/signin"
                className="text-[#d0a539] font-black uppercase tracking-tighter hover:underline"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
