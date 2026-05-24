import Link from 'next/link';

export default function SobrePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white py-16">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="rounded-[2rem] border border-slate-800/80 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/30">
          <div className="mb-8">
            <p className="text-sm uppercase tracking-[0.32em] text-cyan-300">Sobre</p>
            <h1 className="mt-4 text-4xl sm:text-5xl font-semibold text-white max-w-3xl">
              Transformo infraestrutura em experiências de plataforma modernas e resilientes.
            </h1>
          </div>

          <div className="space-y-6 text-slate-300 text-base sm:text-lg leading-8">
            <p>
              Sou Emanuel Nerys, Arquiteto Cloud e SRE. Tenho mais de 2 anos de experiência prática em nuvem e já atuei em projetos que envolvem GitOps, IaC, Kubernetes e operações resilientes.
            </p>
            <p>
              Minha primeira oportunidade como DevOps foi na Engeselt Softwares em 2023 e, desde então, venho evoluindo na carreira até assumir o papel de Arquiteto Cloud. Hoje foco em construir plataformas que engenheiros realmente querem usar.
            </p>
            <p>
              Atuando em projetos como migração de ECS para EKS, implementação de ArgoCD para deploy em clusters Kubernetes e uso de IaC com Terraform para provisionar infraestrutura em nuvem com módulos reutilizáveis. Tenho mais de 2 anos em AWS, propondo melhorias e implementando esteiras de CI/CD bem montadas.
            </p>
            <p>
              Desenvolvo aplicações em Python e Node.js e trabalho para criar ambientes confiáveis, automáticos e fáceis de operar.
            </p>
          </div>

          <div className="mt-10">
            <p className="text-sm uppercase tracking-[0.32em] text-cyan-300">Empresas onde passei</p>
            <div className="mt-6 divide-y divide-slate-800 border-t border-b border-slate-800/80 rounded-3xl bg-slate-900/70 shadow-lg shadow-slate-950/20">
              <div className="flex items-center justify-between px-6 py-4">
                <span className="text-base font-medium text-white">Tely</span>
                <span className="text-sm uppercase tracking-[0.24em] text-slate-400">NOC</span>
              </div>
              <div className="flex items-center justify-between px-6 py-4">
                <span className="text-base font-medium text-white">Engeselt Softwares</span>
                <span className="text-sm uppercase tracking-[0.24em] text-slate-400">DevOps Engineer</span>
              </div>
              <div className="flex items-center justify-between px-6 py-4">
                <span className="text-base font-medium text-white">Equanimüs</span>
                <span className="text-sm uppercase tracking-[0.24em] text-slate-400">DevSecOps / SRE</span>
              </div>
              <div className="flex items-center justify-between px-6 py-4">
                <span className="text-base font-medium text-white">Korporate Solution Factory</span>
                <span className="text-sm uppercase tracking-[0.24em] text-slate-400">DevOps Engineer</span>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-900/80 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Voltar para início
            </Link>
            <Link
              href="/#contato"
              className="inline-flex items-center justify-center rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-xl shadow-orange-500/20 transition hover:bg-orange-400"
            >
              Falar comigo
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
