"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { updateProfile } from "@/lib/actions/updateProfile";

interface EditProfileDialogProps {
  displayName: string;
  bio: string | null;
}

export default function EditProfileDialog({
  displayName,
  bio,
}: EditProfileDialogProps) {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [name, setName] = useState(displayName);
  const [profileBio, setProfileBio] = useState(bio ?? "");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSave() {
    const trimmedName = name.trim();
    const trimmedBio = profileBio.trim();

    if (!trimmedName) {
      setMessage("Display name is required.");
      toast.error("Display name is required.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const formData = new FormData();

      formData.append("display_name", trimmedName);
      formData.append("bio", trimmedBio);

      await updateProfile(formData);

      toast.success("Profile updated successfully!");

      setOpen(false);
      router.refresh();
    } catch (error) {
      console.error("Update profile error:", error);

      setMessage("Unable to update your profile.");
      toast.error("Unable to update your profile.");
    } finally {
      setLoading(false);
    }
  }

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen);
    setMessage("");

    if (!nextOpen) {
      setName(displayName);
      setProfileBio(bio ?? "");
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={handleOpenChange}
    >
      <DialogTrigger className="inline-flex rounded-lg bg-green-700 px-4 py-2 font-medium text-white transition hover:bg-green-800">
        Edit Profile
      </DialogTrigger>

      <DialogContent className="border-[#D4AF37]/30 bg-[#111827] text-white">
        <DialogHeader>
          <DialogTitle className="text-xl text-[#D4AF37]">
            Edit Profile
          </DialogTitle>

          <DialogDescription className="text-gray-400">
            Update your display name and bio.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="display-name"
              className="mb-2 block text-sm text-gray-300"
            >
              Display Name
            </label>

            <Input
              id="display-name"
              value={name}
              maxLength={60}
              disabled={loading}
              onChange={(event) => {
                setName(event.target.value);
                setMessage("");
              }}
              className="border-white/10 bg-[#0B1220] text-white"
            />
          </div>

          <div>
            <label
              htmlFor="profile-bio"
              className="mb-2 block text-sm text-gray-300"
            >
              Bio
            </label>

            <textarea
              id="profile-bio"
              value={profileBio}
              maxLength={300}
              rows={5}
              disabled={loading}
              onChange={(event) =>
                setProfileBio(event.target.value)
              }
              className="w-full rounded-lg border border-white/10 bg-[#0B1220] p-3 text-white outline-none focus:border-[#D4AF37] disabled:cursor-not-allowed disabled:opacity-60"
            />

            <p className="mt-1 text-right text-xs text-gray-500">
              {profileBio.length}/300
            </p>
          </div>

          {message && (
            <p className="rounded-lg border border-red-500/20 bg-red-500/5 p-3 text-sm text-red-300">
              {message}
            </p>
          )}

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              disabled={loading}
              className="flex-1 border-white/20 bg-transparent text-white hover:bg-white/5"
            >
              Cancel
            </Button>

            <Button
              type="button"
              onClick={handleSave}
              disabled={loading || !name.trim()}
              className="flex-1 bg-green-700 hover:bg-green-800"
            >
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}