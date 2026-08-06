"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function RegisterModal() {
    return (
        <Dialog>
            <DialogTrigger
                render={
                    <Button className="rounded-full bg-green-700 px-6 hover:bg-green-800" />
                }
            >
                Register
            </DialogTrigger>

            <DialogContent className="bg-[#111827] border-[#D4AF37]/30">
                <DialogHeader>
                    <DialogTitle className="text-[#D4AF37]">
                        Join the Army
                    </DialogTitle>
                </DialogHeader>

                <Input placeholder="Full Name" />

                <Input placeholder="Email" />

                <Input
                    type="password"
                    placeholder="Password"
                />

                <Input
                    type="password"
                    placeholder="Confirm Password"
                />

                <Button className="bg-green-700 hover:bg-green-800">
                    Register
                </Button>
            </DialogContent>
        </Dialog>
    );
}