"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type AuthView = "login" | "register" | "forgot";

export default function AuthModals() {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<AuthView>("login");

  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  function openModal(selectedView: AuthView) {
    setView(selectedView);
    setOpen(true);
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
        <DialogTrigger className="hidden">
          Open
        </DialogTrigger>

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
                  className="border-white/20 bg-[#0B1220]"
                />

                <div className="relative">
                  <Input
                    type={showLoginPassword ? "text" : "password"}
                    placeholder="Password"
                    className="border-white/20 bg-[#0B1220] pr-12"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowLoginPassword((current) => !current)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                    aria-label={
                      showLoginPassword ? "Hide password" : "Show password"
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
                    onClick={() => setView("forgot")}
                    className="text-sm text-[#D4AF37] hover:text-yellow-300 hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>

                <Button className="w-full bg-green-700 hover:bg-green-800">
                  Login
                </Button>

                <p className="text-center text-sm text-gray-400">
                  Don&apos;t have an account yet?{" "}
                  <button
                    type="button"
                    onClick={() => setView("register")}
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
                  className="border-white/20 bg-[#0B1220]"
                />

                <Input
                  type="email"
                  placeholder="Email"
                  className="border-white/20 bg-[#0B1220]"
                />

                <div className="relative">
                  <Input
                    type={showRegisterPassword ? "text" : "password"}
                    placeholder="Password"
                    className="border-white/20 bg-[#0B1220] pr-12"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowRegisterPassword((current) => !current)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
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
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    className="border-white/20 bg-[#0B1220] pr-12"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword((current) => !current)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>

                <Button className="w-full bg-green-700 hover:bg-green-800">
                  Register
                </Button>

                <p className="text-center text-sm text-gray-400">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setView("login")}
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
                  Enter your email and we will send you a reset link.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <Input
                  type="email"
                  placeholder="Email"
                  className="border-white/20 bg-[#0B1220]"
                />

                <Button className="w-full bg-green-700 hover:bg-green-800">
                  Send Reset Link
                </Button>

                <button
                  type="button"
                  onClick={() => setView("login")}
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