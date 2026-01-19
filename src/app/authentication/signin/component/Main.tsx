import React from "react";

const Main = () => {
  return (
    <div className="bg-white text-[#171512] font-sans">
      <div className="flex flex-col lg:flex-row h-[91.5vh]">
        {/* Left Side: Hero Image */}
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
          <div className="absolute inset-0 z-10 bg-black/40"></div>
          <div
            className="absolute inset-0 z-0 bg-cover bg-center scale-105"
            style={{
              backgroundImage:
                'url("https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop")',
            }}
          ></div>

          <div className="relative z-20 flex flex-col justify-between p-16 w-full">
            <div className="max-w-md">
              <h1 className="text-white text-5xl font-black leading-tight mb-6">
                Invest in the Future of Luxury.
              </h1>
              <p className="text-white/80 text-lg font-light leading-relaxed">
                Join our exclusive real estate investment platform and access
                prime architectural developments across the globe.
              </p>
            </div>

            <div className="text-white/50 text-xs font-bold uppercase tracking-[0.3em]">
              © 2026 BugaKing Conglomerate
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="flex-1 flex items-center justify-center p-8 sm:p-12 lg:p-20 bg-white">
          <div className="w-full max-w-md space-y-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-black tracking-tight text-[#171512]">
                Welcome Back
              </h2>
              <p className="text-[#171512]/60 text-sm">
                Begin your journey with the world's premier investment group.
              </p>
            </div>

            <form className="space-y-5">
              {/* Email Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase tracking-widest text-[#171512]/50">
                  Email Address
                </label>
                <input
                  className="block w-full border border-gray-200 rounded-lg text-sm px-4 py-3 bg-gray-50 
                             focus:border-[#d0a539] focus:ring-2 focus:ring-[#d0a539] outline-none transition-colors"
                  placeholder="j.doe@example.com"
                  type="email"
                />
              </div>

              {/* Password Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase tracking-widest text-[#171512]/50">
                  Password
                </label>
                <div className="relative">
                  <input
                    className="block w-full border border-gray-200 rounded-lg text-sm px-4 py-3 bg-gray-50
                               focus:border-[#d0a539] focus:ring-2 focus:ring-[#d0a539] outline-none transition-colors"
                    type="password"
                    defaultValue="••••••••"
                  />
                  <button
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#171512]/40 hover:text-[#d0a539] transition-colors"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-lg">
                      visibility
                    </span>
                  </button>
                </div>

                {/* Strength Bar */}
                <div className="w-full bg-gray-200 rounded-full mt-2 relative overflow-hidden h-1">
                  <div className="bg-[#d0a539] h-full w-[65%]"></div>
                </div>
                <p className="text-[10px] text-[#171512]/40 font-bold uppercase mt-1">
                  Security Strength: Strong
                </p>
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start gap-3 py-2">
                <input
                  className="mt-1 rounded border-gray-300 text-[#d0a539] focus:ring-2 focus:ring-[#d0a539]"
                  id="terms"
                  type="checkbox"
                />
                <label
                  className="text-xs leading-relaxed text-[#171512]/60"
                  htmlFor="terms"
                >
                  I agree to the{" "}
                  <a
                    className="text-[#d0a539] font-bold hover:underline"
                    href="#"
                  >
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a
                    className="text-[#d0a539] font-bold hover:underline"
                    href="#"
                  >
                    Privacy Policy
                  </a>
                  . I understand that real estate investments carry risk.
                </label>
              </div>

              {/* Submit Button */}
              <button className="w-full bg-[#d0a539] text-[#171512] font-black uppercase tracking-[0.2em] py-4 rounded-lg hover:bg-opacity-90 transition-all shadow-lg shadow-[#d0a539]/20">
                Create Account
              </button>
            </form>

            <p className="text-center text-sm text-[#171512]/60">
              Already have an account?{" "}
              <a
                className="text-[#d0a539] font-black uppercase tracking-tighter hover:underline"
                href="#"
              >
                Log in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
