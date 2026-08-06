import { Button } from "@/components/ui/button";

export default function Hero() {
    return (
        <section className="relative flex min-h-[90vh] items-center justify-center bg-gradient-to-b from-[#0B1220] via-[#111827] to-black">

            {/* Hero Content */}
            <div className="relative z-10 max-w-3xl px-6 text-center">

                <div className="mb-6 text-6xl text-[#D4AF37]">
                    ✝
                </div>

                <h1 className="text-5xl font-extrabold tracking-widest text-[#D4AF37] md:text-7xl">
                    CHRISTIAN SOLDIER
                </h1>

                <p className="mt-8 text-2xl font-semibold text-white">
                    Fight the good fight of the faith.
                </p>

                <p className="mt-2 text-lg text-[#D4AF37]">
                    — 1 Timothy 6:12
                </p>

                <Button
                    size="lg"
                    className="mt-10 bg-green-700 px-10 py-6 text-lg hover:bg-green-800"
                >
                    🛡 Join the Army
                </Button>

            </div>

        </section>
    );
}