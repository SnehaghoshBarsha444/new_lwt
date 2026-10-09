"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LWTLogo } from "@/components/branding/LWTLogo";

export default function AuthPortalPage() {
  const router = useRouter();

  // Mode: "signin" | "register" | "forgot"
  const [mode, setMode] = useState<"signin" | "register" | "forgot">("signin");

  // Form Fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [agreeTerms, setAgreeTerms] = useState(true);

  // States
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [resetSent, setResetSent] = useState(false);

  // Handle Form Submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    // Validation
    if (mode === "register" && !name.trim()) {
      setErrorMessage("Please enter your full name.");
      return;
    }
    if (!email || !email.includes("@")) {
      setErrorMessage("Please enter a valid work or student email address.");
      return;
    }
    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }
    if (mode === "register" && !agreeTerms) {
      setErrorMessage("Please accept the terms of service to register.");
      return;
    }

    setLoading(true);

    // Simulate login / registration and redirect to dashboard
    setTimeout(() => {
      setLoading(false);
      router.push("/dashboard");
    }, 900);
  };

  // Google OAuth Action
  const handleGoogleAuth = () => {
    setGoogleLoading(true);
    setTimeout(() => {
      setGoogleLoading(false);
      router.push("/dashboard");
    }, 1000);
  };

  // Forgot Password Action
  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setErrorMessage("Please enter your registered email address.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setResetSent(true);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-ambient-clean flex flex-col justify-between py-8 sm:py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden select-none">
      {/* Background Ambient Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-r from-[#153EC1]/15 via-[#2ED2EF]/20 to-[#7B3ED6]/15 blur-3xl rounded-full pointer-events-none" />

      {/* Top Bar */}
      <header className="max-w-6xl mx-auto w-full flex items-center justify-between z-10">
        <LWTLogo />
        <Link
          href="/"
          className="text-xs font-semibold text-[#535D80] hover:text-[#153EC1] flex items-center gap-1.5 transition-colors py-2 px-3.5 rounded-full hover:bg-white/70"
        >
          <span>&larr;</span> Back to Home
        </Link>
      </header>

      {/* Center Auth Card */}
      <main className="w-full max-w-[440px] mx-auto my-auto z-10 py-6">
        <div className="saas-card rounded-3xl p-6 sm:p-9 shadow-2xl shadow-[#153EC1]/10 border border-[#CBB4FF]/70 bg-white/95 backdrop-blur-xl">

          {/* Top Pill Switcher: SIGN IN vs REGISTER */}
          {mode !== "forgot" && (
            <div className="flex items-center p-1 rounded-full bg-[#F5F7FE] border border-[#CBB4FF]/50 mb-6">
              <button
                type="button"
                onClick={() => {
                  setMode("signin");
                  setErrorMessage("");
                }}
                className={`flex-1 py-2 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
                  mode === "signin"
                    ? "bg-[#0A0F2B] text-white shadow-sm"
                    : "text-[#535D80] hover:text-[#0A0F2B]"
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode("register");
                  setErrorMessage("");
                }}
                className={`flex-1 py-2 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
                  mode === "register"
                    ? "bg-[#153EC1] text-white shadow-sm"
                    : "text-[#535D80] hover:text-[#153EC1]"
                }`}
              >
                Register
              </button>
            </div>
          )}

          {/* Card Title & Subtitle */}
          <div className="text-center mb-6">
            <span className="font-mono text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full border inline-block mb-2 bg-[#153EC1]/10 text-[#153EC1] border-[#153EC1]/20">
              {mode === "signin" && "RETURNING DEVELOPER"}
              {mode === "register" && "NEW REGISTRATION"}
              {mode === "forgot" && "ACCOUNT RECOVERY"}
            </span>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0A0F2B] tracking-tight">
              {mode === "signin" && "Welcome back"}
              {mode === "register" && "Create your account"}
              {mode === "forgot" && "Reset your password"}
            </h1>

            <p className="text-xs text-[#535D80] mt-1.5 leading-relaxed">
              {mode === "signin" && "Sign in to access your simulated enterprise sprint workspace."}
              {mode === "register" && "Join LWT to build your verified execution portfolio with AI."}
              {mode === "forgot" && "Enter your email to receive recovery instructions."}
            </p>
          </div>

          {/* Error Message Toast */}
          {errorMessage && (
            <div className="mb-5 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs flex items-center gap-2">
              <span className="font-bold">!</span>
              <span>{errorMessage}</span>
            </div>
          )}

          {/* ========================================================
              SIGN IN & REGISTER FORM
              ======================================================== */}
          {mode !== "forgot" ? (
            <>
              {/* Google Button */}
              <button
                type="button"
                onClick={handleGoogleAuth}
                disabled={googleLoading || loading}
                className="w-full py-2.5 px-4 rounded-xl border border-[#CBB4FF]/70 hover:border-[#8E7CF6] bg-white text-[#0A0F2B] font-semibold text-xs flex items-center justify-center gap-3 transition-all duration-200 hover:shadow-xs hover:bg-[#F5F7FE] cursor-pointer mb-5"
              >
                {googleLoading ? (
                  <span className="w-4 h-4 border-2 border-[#153EC1] border-t-transparent rounded-full animate-spin" />
                ) : (
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                )}
                <span>
                  {mode === "signin" ? "Sign in with Google" : "Sign up with Google"}
                </span>
              </button>

              <div className="relative mb-5 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#CBB4FF]/40" />
                </div>
                <span className="relative px-3 bg-white text-[10px] font-mono text-[#535D80] uppercase">
                  or continue with email
                </span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3.5">
                {/* Full Name field only shown on Register */}
                {mode === "register" && (
                  <div>
                    <label className="block text-xs font-semibold text-[#0A0F2B] mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Alex Mercer"
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#CBB4FF]/60 focus:border-[#153EC1] focus:ring-2 focus:ring-[#153EC1]/20 bg-[#F5F7FE]/70 text-xs text-[#0A0F2B] outline-hidden transition-all"
                    />
                  </div>
                )}

                {/* Email Address */}
                <div>
                  <label className="block text-xs font-semibold text-[#0A0F2B] mb-1">
                    Work or Student Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="developer@example.com"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#CBB4FF]/60 focus:border-[#153EC1] focus:ring-2 focus:ring-[#153EC1]/20 bg-[#F5F7FE]/70 text-xs text-[#0A0F2B] outline-hidden transition-all"
                  />
                </div>

                {/* Password Field */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-semibold text-[#0A0F2B]">
                      Password
                    </label>
                    {mode === "signin" && (
                      <button
                        type="button"
                        onClick={() => {
                          setMode("forgot");
                          setErrorMessage("");
                        }}
                        className="text-[11px] font-semibold text-[#153EC1] hover:text-[#7B3ED6] transition-colors"
                      >
                        Forgot password?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={mode === "register" ? "At least 6 characters" : "••••••••••••"}
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#CBB4FF]/60 focus:border-[#153EC1] focus:ring-2 focus:ring-[#153EC1]/20 bg-[#F5F7FE]/70 text-xs text-[#0A0F2B] outline-hidden transition-all pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-[#535D80] hover:text-[#153EC1] px-1"
                    >
                      {showPassword ? "HIDE" : "SHOW"}
                    </button>
                  </div>
                </div>

                {/* Checkboxes */}
                {mode === "signin" ? (
                  <div className="flex items-center justify-between pt-1">
                    <label className="flex items-center gap-2 cursor-pointer text-xs text-[#535D80]">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="w-3.5 h-3.5 rounded border-[#CBB4FF] text-[#153EC1] focus:ring-[#153EC1]"
                      />
                      <span>Remember this session</span>
                    </label>
                    <span className="text-[10px] font-mono text-[#2ED2EF] bg-[#2ED2EF]/10 px-2 py-0.5 rounded">
                      ENCRYPTED
                    </span>
                  </div>
                ) : (
                  <div className="pt-1">
                    <label className="flex items-start gap-2 cursor-pointer text-xs text-[#535D80]">
                      <input
                        type="checkbox"
                        checked={agreeTerms}
                        onChange={(e) => setAgreeTerms(e.target.checked)}
                        className="w-3.5 h-3.5 mt-0.5 rounded border-[#CBB4FF] text-[#153EC1] focus:ring-[#153EC1]"
                      />
                      <span>
                        I agree to LWT simulation terms & verified AST review policies.
                      </span>
                    </label>
                  </div>
                )}

                {/* Main Action Button */}
                <button
                  type="submit"
                  disabled={loading || googleLoading}
                  className="w-full mt-3 py-3 px-6 rounded-full bg-gradient-to-r from-[#153EC1] via-[#287BEB] to-[#2ED2EF] text-white font-bold text-xs tracking-wide shadow-md shadow-[#153EC1]/25 hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>{mode === "signin" ? "Authenticating..." : "Creating Account..."}</span>
                    </>
                  ) : (
                    <>
                      <span>{mode === "signin" ? "Enter LWT Workspace" : "Register & Launch"}</span>
                      <span>&rarr;</span>
                    </>
                  )}
                </button>
              </form>

              {/* Bottom Quick Switch */}
              <div className="mt-6 pt-4 border-t border-[#CBB4FF]/40 text-center text-xs text-[#535D80]">
                {mode === "signin" ? (
                  <>
                    Don&apos;t have an account?{" "}
                    <button
                      type="button"
                      onClick={() => {
                        setMode("register");
                        setErrorMessage("");
                      }}
                      className="font-bold text-[#153EC1] hover:underline"
                    >
                      Register here &rarr;
                    </button>
                  </>
                ) : (
                  <>
                    Already registered?{" "}
                    <button
                      type="button"
                      onClick={() => {
                        setMode("signin");
                        setErrorMessage("");
                      }}
                      className="font-bold text-[#153EC1] hover:underline"
                    >
                      Sign In here &rarr;
                    </button>
                  </>
                )}
              </div>
            </>
          ) : (
            /* ========================================================
                FORGOT PASSWORD VIEW
                ======================================================== */
            <div className="space-y-4">
              {resetSent ? (
                <div className="text-center py-4 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-xl font-bold">
                    ✓
                  </div>
                  <h3 className="text-base font-bold text-[#0A0F2B]">
                    Reset link dispatched
                  </h3>
                  <p className="text-xs text-[#535D80] leading-relaxed">
                    Check your inbox at <strong className="text-[#0A0F2B]">{email}</strong> for instructions.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setMode("signin");
                      setResetSent(false);
                    }}
                    className="mt-4 px-6 py-2.5 rounded-full bg-[#0A0F2B] text-white text-xs font-bold hover:bg-[#153EC1] transition-colors"
                  >
                    Back to Sign In
                  </button>
                </div>
              ) : (
                <form onSubmit={handleForgotSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#0A0F2B] mb-1.5">
                      Your Registered Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="developer@example.com"
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#CBB4FF]/60 focus:border-[#153EC1] focus:ring-2 focus:ring-[#153EC1]/20 bg-[#F5F7FE]/70 text-xs text-[#0A0F2B] outline-hidden"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 px-6 rounded-full bg-[#153EC1] text-white font-bold text-xs shadow-md hover:bg-[#287BEB] transition-all flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      "Send Recovery Link"
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setMode("signin");
                      setErrorMessage("");
                    }}
                    className="w-full text-center text-xs font-semibold text-[#535D80] hover:text-[#0A0F2B] pt-2 block"
                  >
                    &larr; Cancel and return to Sign In
                  </button>
                </form>
              )}
            </div>
          )}

        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-[11px] text-[#535D80] font-mono z-10 pt-4">
        &copy; 2026 LWT &middot; <span className="text-[#153EC1]">LAKSHYNiTi ECOSYSTEM</span> &middot; SIMULATED WORKPLACE CORE
      </footer>
    </div>
  );
}