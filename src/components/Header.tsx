import Link from 'next/link';

export default function Header() {
  return (
    <header className="w-full bg-transparent py-1">
      <div className="max-w-7xl mx-auto px-2 sm:px-3">
        <div className="flex items-center justify-between gap-1 bg-white/5 backdrop-blur rounded-xl px-2 py-0.5 shadow-sm border border-white/10">
          {/* Left: Logo + Name */}
          <div className="flex items-center gap-1">
            <div className="flex items-center justify-center w-7 h-7 rounded-md bg-orange-500 text-white font-semibold text-xs">EN</div>
            <div className="text-sm font-medium text-white">Emanuel Nerys</div>
          </div>

          {/* Center: Nav */}
          <nav className="hidden md:flex items-center gap-2 text-sm text-slate-300">
            <Link href="/" className="hover:text-white">Início</Link>
            <Link href="#" className="hover:text-white">Cases</Link>
            {/* O link 'Textos' foi removido daqui para deixar o menu mais enxuto */}
            <Link href="/artigos" className="hover:text-white">Artigos</Link>
            <Link href="/sobre" className="hover:text-white">Sobre</Link>
          </nav>

          {/* Right: Language toggle + Contact button */}
          <div className="flex items-center gap-1">
            <div className="hidden sm:flex items-center bg-white/5 rounded-full px-1 py-0.5 text-xs text-slate-200 border border-white/10">
              <span className="px-1 font-medium">PT</span>
              <span className="px-1 text-slate-400">EN</span>
            </div>

            <Link
              href="#contact"
              className="inline-block rounded-full bg-orange-500 text-white px-2 py-0.5 text-xs font-semibold shadow hover:brightness-95"
            >
              Entre em contato
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}