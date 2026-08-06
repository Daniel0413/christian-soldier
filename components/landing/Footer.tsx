import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[#D4AF37]/20 bg-[#0B1220] py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 md:flex-row">

        {/* Logo */}
        <div>
          <h2 className="text-xl font-bold text-[#D4AF37]">
            ✝ Christian Soldier
          </h2>

          <p className="mt-2 text-sm text-gray-400">
            Fight the good fight of faith.
          </p>
        </div>

        {/* Links */}
        <div className="flex gap-6 text-gray-300">

          <Link href="/" className="hover:text-[#D4AF37]">
            Home
          </Link>

          <a href="#about" className="hover:text-[#D4AF37]">
            About
          </a>

          <Link href="#" className="hover:text-[#D4AF37]">
            Login
          </Link>

        </div>

        {/* Copyright */}
        <div className="text-sm text-gray-500">
          © {new Date().getFullYear()} Christian Soldier
        </div>

      </div>
    </footer>
  );
}