"use client";

import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";

type AuthView = "login" | "register" | "forgot";

export default function AuthModals() {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<AuthView>("login");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showLoginPassword, setShowLoginPassword] =
    useState(false);

  const [showRegisterPassword, setShowRegisterPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const supabase = createClient();
  useEffect(() => {
  async function checkSession() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      window.location.href = "/dashboard";
    }
  }

  void checkSession();
}, []);

  function openModal(selectedView: AuthView) {
    setView(selectedView);
    setMessage("");
    setOpen(true);
  }

  function switchView(selectedView: AuthView) {
    setView(selectedView);
    setMessage("");
  }

  async function handleLogin() {
    setMessage("");

    if (!email.trim() || !password) {
      setMessage("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      const { error } =
        await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

      if (error) {
        setMessage(error.message);
        return;
      }

      setOpen(false);

      // Full reload sends the new authentication cookies
      // to the dashboard server page.
      window.location.href = "/dashboard";
    } catch {
      setMessage("Unable to log in. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleRegister() {
    setMessage("");

    if (
      !fullName.trim() ||
      !email.trim() ||
      !password ||
      !confirmPassword
    ) {
      setMessage("Please complete all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setMessage(
        "Password must contain at least 6 characters."
      );
      return;
    }

    try {
      setLoading(true);

      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            display_name: fullName.trim(),
          },
        },
      });

      if (error) {
        setMessage(error.message);
        return;
      }

      setPassword("");
      setConfirmPassword("");

      if (!data.session) {
        setMessage(
          "Registration successful. Check your email to confirm your account."
        );
        return;
      }

      switchView("login");
      setMessage(
        "Registration successful. You may now log in."
      );
    } catch {
      setMessage(
        "Unable to register. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleForgotPassword() {
    setMessage("");

    if (!email.trim()) {
      setMessage("Please enter your email address.");
      return;
    }

    try {
      setLoading(true);

      const { error } =
        await supabase.auth.resetPasswordForEmail(
          email.trim(),
          {
            redirectTo: `${window.location.origin}/reset-password`,
          }
        );

      if (error) {
        setMessage(error.message);
        return;
      }

      setMessage(
        "Password reset link sent. Check your email."
      );
    } catch {
      setMessage(
        "Unable to send the reset link. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          onClick={() => openModal("login")}
          className="font-medium text-[#D4AF37] hover:bg-transparent hover:text-yellow-300"
        >
          Login
        </Button>

        <Button
          onClick={() => openModal("register")}
          className="rounded-full bg-green-700 px-6 text-white hover:bg-green-800"
        >
          Register
        </Button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="border-[#D4AF37]/30 bg-[#111827] text-white">
          {view === "login" && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl text-[#D4AF37]">
                  Welcome Back, Soldier
                </DialogTitle>

                <DialogDescription className="text-gray-400">
                  Enter your account details to continue.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                  className="border-white/20 bg-[#0B1220]"
                />

                <div className="relative">
                  <Input
                    type={
                      showLoginPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Password"
                    value={password}
                    onChange={(event) =>
                      setPassword(event.target.value)
                    }
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        void handleLogin();
                      }
                    }}
                    className="border-white/20 bg-[#0B1220] pr-12"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowLoginPassword(
                        (current) => !current
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                    aria-label={
                      showLoginPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showLoginPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>

                <div className="text-right">
                  <button
                    type="button"
                    onClick={() => switchView("forgot")}
                    className="text-sm text-[#D4AF37] hover:text-yellow-300 hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>

                {message && (
                  <p className="rounded-lg border border-white/10 bg-[#0B1220] p-3 text-sm text-gray-300">
                    {message}
                  </p>
                )}

                <Button
                  type="button"
                  onClick={handleLogin}
                  disabled={loading}
                  className="w-full bg-green-700 hover:bg-green-800"
                >
                  {loading ? "Logging in..." : "Login"}
                </Button>

                <p className="text-center text-sm text-gray-400">
                  Don&apos;t have an account yet?{" "}
                  <button
                    type="button"
                    onClick={() => switchView("register")}
                    className="font-medium text-[#D4AF37] hover:text-yellow-300 hover:underline"
                  >
                    Register
                  </button>
                </p>
              </div>
            </>
          )}

          {view === "register" && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl text-[#D4AF37]">
                  Join the Army
                </DialogTitle>

                <DialogDescription className="text-gray-400">
                  Create your Christian Soldier account.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <Input
                  type="text"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(event) =>
                    setFullName(event.target.value)
                  }
                  className="border-white/20 bg-[#0B1220]"
                />

                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                  className="border-white/20 bg-[#0B1220]"
                />

                <div className="relative">
                  <Input
                    type={
                      showRegisterPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Password"
                    value={password}
                    onChange={(event) =>
                      setPassword(event.target.value)
                    }
                    className="border-white/20 bg-[#0B1220] pr-12"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowRegisterPassword(
                        (current) => !current
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                    aria-label={
                      showRegisterPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showRegisterPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>

                <div className="relative">
                  <Input
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(event) =>
                      setConfirmPassword(
                        event.target.value
                      )
                    }
                    className="border-white/20 bg-[#0B1220] pr-12"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(
                        (current) => !current
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                    aria-label={
                      showConfirmPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>

                {message && (
                  <p className="rounded-lg border border-white/10 bg-[#0B1220] p-3 text-sm text-gray-300">
                    {message}
                  </p>
                )}

                <Button
                  type="button"
                  onClick={handleRegister}
                  disabled={loading}
                  className="w-full bg-green-700 hover:bg-green-800"
                >
                  {loading
                    ? "Registering..."
                    : "Register"}
                </Button>

                <p className="text-center text-sm text-gray-400">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => switchView("login")}
                    className="font-medium text-[#D4AF37] hover:text-yellow-300 hover:underline"
                  >
                    Login
                  </button>
                </p>
              </div>
            </>
          )}

          {view === "forgot" && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl text-[#D4AF37]">
                  Reset Password
                </DialogTitle>

                <DialogDescription className="text-gray-400">
                  Enter your email and we will send you a
                  reset link.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                  className="border-white/20 bg-[#0B1220]"
                />

                {message && (
                  <p className="rounded-lg border border-white/10 bg-[#0B1220] p-3 text-sm text-gray-300">
                    {message}
                  </p>
                )}

                <Button
                  type="button"
                  onClick={handleForgotPassword}
                  disabled={loading}
                  className="w-full bg-green-700 hover:bg-green-800"
                >
                  {loading
                    ? "Sending..."
                    : "Send Reset Link"}
                </Button>

                <button
                  type="button"
                  onClick={() => switchView("login")}
                  className="w-full text-sm text-[#D4AF37] hover:text-yellow-300 hover:underline"
                >
                  Back to Login
                </button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}