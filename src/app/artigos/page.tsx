export default function ArtigosPage() {
  const posts = [
    {
      title: "Como estruturar uma pipeline CI/CD resiliente com GitHub Actions e Docker",
      excerpt: "Aprenda a evitar erros comuns de build, gerenciar cache do Buildx e otimizar imagens utilizando multi-stage build.",
      date: "26 de Maio, 2026",
      readTime: "5 min de leitura"
    },
    {
      title: "Otimizando custos na nuvem: Estratégias de Arquitetura Cloud",
      excerpt: "Práticas essenciais de SRE e FinOps para reduzir custos de infraestrutura sem perder performance.",
      date: "18 de Maio, 2026",
      readTime: "7 min de leitura"
    }
  ];

  return (
    <main className="w-full min-h-screen bg-[#030712] text-white pt-28 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="border-b border-white/10 pb-6 mb-10">
          <span className="text-xs font-semibold uppercase tracking-wider text-orange-500">Tech Blog</span>
          <h1 className="text-3xl md:text-4xl font-bold mt-2 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            Artigos & Insights Técnicos
          </h1>
          <p className="text-slate-400 mt-2 text-sm md:text-base">
            Conteúdo aprofundado sobre DevOps, Engenharia de Plataforma, SRE e Cloud.
          </p>
        </div>

        <div className="flex flex-col gap-8">
          {posts.map((post, index) => (
            <article key={index} className="p-6 bg-white/5 rounded-xl border border-white/10 hover:border-orange-500/50 transition-all cursor-pointer group">
              <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
                <time>{post.date}</time>
                <span>•</span>
                <span>{post.readTime}</span>
              </div>
              <h2 className="text-xl font-semibold group-hover:text-orange-500 transition-colors mb-2">{post.title}</h2>
              <p className="text-sm text-slate-400 leading-relaxed">{post.excerpt}</p>
              <div className="mt-4 text-xs font-medium text-orange-500 flex items-center gap-1 group-hover:underline">
                Ler artigo completo ➔
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}