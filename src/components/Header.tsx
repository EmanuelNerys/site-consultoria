import Link from 'next/link';

export default function Header() {
  return (
    <header className="w-full bg-transparent py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between gap-4 bg-white/5 backdrop-blur rounded-xl px-4 py-2 shadow-sm border border-white/10">
          {/* Left: Logo + Name */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-9 h-9 rounded-md bg-orange-500 text-white font-semibold">EN</div>
            <div className="text-sm font-medium text-white">Emanuel Nerys</div>
          </div>

          {/* Center: Nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm text-slate-300">
            <Link href="#" className="hover:text-white">Trabalhos</Link>
            <Link href="#" className="hover:text-white">Textos</Link>
            <Link href="#" className="hover:text-white">Sobre</Link>
          </nav>

          {/* Right: Language toggle + Contact button */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center bg-white/5 rounded-full px-2 py-1 text-xs text-slate-200 border border-white/10">
              <span className="px-2 font-medium">PT</span>
              <span className="px-2 text-slate-400">EN</span>
            </div>

            <Link
              href="#contact"
              className="ml-2 inline-block rounded-full bg-orange-500 text-white px-4 py-2 text-sm font-semibold shadow hover:brightness-95"
            >
              Entre em contato
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
