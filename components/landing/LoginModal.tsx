"use client";

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

export default function LoginModal() {
  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button
            variant="ghost"
            className="font-medium text-[#D4AF37] hover:bg-transparent hover:text-yellow-300"
          />
        }
      >
        Login
      </DialogTrigger>

      <DialogContent className="border-[#D4AF37]/30 bg-[#111827] text-white">
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
            className="border-white/20 bg-[#0B1220] text-white placeholder:text-gray-500"
          />

          <Input
            type="password"
            placeholder="Password"
            className="border-white/20 bg-[#0B1220] text-white placeholder:text-gray-500"
          />

          <div className="text-right">
            <button
              type="button"
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
              className="font-medium text-[#D4AF37] hover:text-yellow-300 hover:underline"
            >
              Register
            </button>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}