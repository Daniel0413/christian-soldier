"use client";

import { useRef, useState } from "react";
import Image from "next/image";

import { uploadAvatar } from "@/lib/actions/uploadAvatar";

interface AvatarUploadProps {
    avatarUrl: string | null;
}

export default function AvatarUpload({
    avatarUrl,
}: AvatarUploadProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    const [uploading, setUploading] =
        useState(false);

    async function handleChange(
        e: React.ChangeEvent<HTMLInputElement>
    ) {
        const file = e.target.files?.[0];

        if (!file) return;

        const formData = new FormData();

        formData.append("avatar", file);

        try {
            setUploading(true);

            await uploadAvatar(formData);

            window.location.reload();
        } finally {
            setUploading(false);
        }
    }

    return (
        <>
            <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="relative"
            >
                {avatarUrl ? (
                    <Image
                        src={avatarUrl}
                        alt="Avatar"
                        width={112}
                        height={112}
                        className="h-28 w-28 rounded-full object-cover border border-[#D4AF37]/30"
                    />
                ) : (
                    <div className="flex h-28 w-28 items-center justify-center rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 text-4xl">
                        👤
                    </div>
                )}

                <div className="absolute -bottom-1 -right-1 text-3xl font-bold leading-none text-white drop-shadow-md">
                    📷
                </div>
            </button>

            <input
                ref={inputRef}
                type="file"
                hidden
                accept="image/png,image/jpeg,image/webp"
                onChange={handleChange}
            />

            {uploading && (
                <p className="mt-3 text-sm text-[#D4AF37]">
                    Uploading...
                </p>
            )}
        </>
    );
}