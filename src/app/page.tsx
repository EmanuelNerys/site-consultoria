import ContactForm from '@/components/ContactForm';

export default function Home() {
  return (
    <main className="bg-slate-950">
      <section className="overflow-hidden py-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_420px] items-center">
            <div className="space-y-10 w-full lg:col-span-2">
              
              {/* Seção de Texto Principal */}
              <div className="space-y-8">
                <div className="inline-flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.3em] text-cyan-300">
                  <span>DevOps</span>
                  <span>•</span>
                  <span>SRE</span>
                  <span>•</span>
                  <span>Cloud Platforms</span>
                </div>
                <h1 className="text-5xl sm:text-6xl font-semibold text-white leading-tight max-w-3xl">
                  Arquitetura cloud sólida, com automação e segurança para sua operação crescer sem sustos.
                </h1>
                <p className="text-lg text-slate-300 max-w-2xl">
                  Sou Emanuel Nerys, Arquiteto Cloud e SRE. Ajudo equipes a construir plataformas cloud seguras, escaláveis e fáceis de operar.
                </p>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <a
                    href="#contato"
                    className="inline-flex items-center justify-center rounded-full bg-orange-500 px-7 py-3 text-sm font-semibold text-slate-950 shadow-xl shadow-orange-500/20 transition hover:bg-orange-400"
                  >
                    Entre em contato
                  </a>
                  <a
                    href="/sobre"
                    className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-900/80 px-7 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                  >
                    Ver experiência
                  </a>
                </div>
              </div>

              {/* GRID AMPLIVADA - SEM QUEBRAS DE LINHA */}
              <div className="w-full grid gap-4 grid-cols-2 md:grid-cols-4 mt-10">
                
                {/* CARD 1 - ANOS EM DEVOPS */}
                <div className="rounded-3xl border border-slate-800/80 bg-slate-900/70 p-6 text-white shadow-lg shadow-slate-950/20 flex flex-col justify-between min-h-[160px] transition-all hover:border-slate-700">
                  <div>
                    <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-slate-400 mb-4 min-h-[32px]">
                      Anos em DevOps
                    </p>
                    <p className="text-2xl sm:text-3xl font-bold tracking-tight whitespace-nowrap">2+</p>
                  </div>
                  <p className="mt-3 text-xs text-slate-500">desde 2022</p>
                </div>

                {/* CARD 2 - CLOUDS */}
                <div className="rounded-3xl border border-slate-800/80 bg-slate-900/70 p-6 text-white shadow-lg shadow-slate-950/20 flex flex-col justify-between min-h-[160px] transition-all hover:border-slate-700">
                  <div>
                    <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-slate-400 mb-4 min-h-[32px]">
                      Clouds em produção
                    </p>
                    <p className="text-2xl sm:text-3xl font-bold tracking-tight whitespace-nowrap">AWS</p>
                  </div>
                  <p className="mt-3 text-xs text-slate-500">produção estável</p>
                </div>

                {/* CARD 3 - KUBERNETES SEM QUEBRA */}
                <div className="rounded-3xl border border-slate-800/80 bg-slate-900/70 p-6 text-white shadow-lg shadow-slate-950/20 flex flex-col justify-between min-h-[160px] transition-all hover:border-slate-700">
                  <div>
                    <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-slate-400 mb-4 min-h-[32px]">
                      Stack principal
                    </p>
                    <p className="text-[13px] sm:text-lg md:text-xl xl:text-2xl font-bold tracking-tight whitespace-nowrap">
                      Kubernetes
                    </p>
                  </div>
                  <p className="mt-3 text-xs text-slate-500">EKS e orquestração</p>
                </div>

                {/* CARD 4 - TERRAFORM SEM QUEBRA */}
                <div className="rounded-3xl border border-slate-800/80 bg-slate-900/70 p-6 text-white shadow-lg shadow-slate-950/20 flex flex-col justify-between min-h-[160px] transition-all hover:border-slate-700">
                  <div>
                    <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-slate-400 mb-4 min-h-[32px]">
                      Infra como código
                    </p>
                    <p className="text-[13px] sm:text-lg md:text-xl xl:text-2xl font-bold tracking-tight whitespace-nowrap">
                      Terraform
                    </p>
                  </div>
                  <p className="mt-3 text-xs text-slate-500">infra repetível</p>
                </div>

              </div>

            </div>
          </div>
        </div>
      </section>

      <section id="contato">
        <ContactForm />
      </section>
    </main>
  );
}