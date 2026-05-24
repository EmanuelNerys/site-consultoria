import ContactForm from '@/components/ContactForm';

export default function Home() {
  return (
    <main className="bg-slate-950">
      <section className="overflow-hidden py-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_420px] items-center">
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
                Sou Emanuel — Cloud & DevOps com foco em AWS e Kubernetes. Tenho mais de 2 anos de experiência, trabalho com GitOps e infraestrutura como código (IaC). Entrego automação, observabilidade e operações seguras para times que querem escalar sem dor.
              </p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <a
                  href="#contato"
                  className="inline-flex items-center justify-center rounded-full bg-orange-500 px-7 py-3 text-sm font-semibold text-slate-950 shadow-xl shadow-orange-500/20 transition hover:bg-orange-400"
                >
                  Entre em contato
                </a>
                <a
                  href="#contato"
                  className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-900/80 px-7 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Ver experiência
                </a>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 mt-6">
                <div className="rounded-3xl border border-slate-800/80 bg-slate-900/70 p-6 text-white shadow-lg shadow-slate-950/20">
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-400 mb-3">Anos em DevOps</p>
                  <p className="text-4xl font-semibold">2+</p>
                  <p className="mt-2 text-sm text-slate-400">desde 2022</p>
                </div>
                <div className="rounded-3xl border border-slate-800/80 bg-slate-900/70 p-6 text-white shadow-lg shadow-slate-950/20">
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-400 mb-3">Clouds em produção</p>
                  <p className="text-4xl font-semibold">AWS</p>
                  <p className="mt-2 text-sm text-slate-400">produção estável e escalável</p>
                </div>
                <div className="rounded-3xl border border-slate-800/80 bg-slate-900/70 p-6 text-white shadow-lg shadow-slate-950/20">
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-400 mb-3">Stack principal</p>
                  <p className="text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight break-words">Kubernetes</p>
                  <p className="mt-2 text-sm text-slate-400">EKS e orquestração cloud-native</p>
                </div>
                <div className="rounded-3xl border border-slate-800/80 bg-slate-900/70 p-6 text-white shadow-lg shadow-slate-950/20">
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-400 mb-3">Infra como código</p>
                  <p className="text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight break-words">Terraform</p>
                  <p className="mt-2 text-sm text-slate-400">infraestrutura segura e repetível</p>
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
