'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import { CheckCircle, AlertCircle, Loader, Award, Cpu } from 'lucide-react';

interface FormData {
  fullName: string;
  email: string;
  company: string;
  bottleneck: string;
  message: string;
}

interface FormStatus {
  type: 'idle' | 'loading' | 'success' | 'error';
  message?: string;
}

const bottleneckOptions = [
  { value: 'finops', label: 'Custos Cloud Altos (FinOps)' },
  { value: 'cicd', label: 'Lentidão nos Deploys (CI/CD)' },
  { value: 'stability', label: 'Instabilidade/Quedas no Sistema' },
  { value: 'migration', label: 'Migração para Nuvem' },
  { value: 'other', label: 'Outros' },
];

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    company: '',
    bottleneck: 'finops',
    message: '',
  });

  const [status, setStatus] = useState<FormStatus>({ type: 'idle' });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Nome completo é obrigatório';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'E-mail é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'E-mail inválido';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Mensagem é obrigatória';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Mensagem deve ter pelo menos 10 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      setStatus({
        type: 'error',
        message: 'Por favor, corrija os erros abaixo',
      });
      return;
    }

    setStatus({ type: 'loading' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({
          type: 'success',
          message: data.message || 'Formulário enviado com sucesso!',
        });
        setFormData({
          fullName: '',
          email: '',
          company: '',
          bottleneck: 'finops',
          message: '',
        });
        setTimeout(() => setStatus({ type: 'idle' }), 5000);
      } else {
        setStatus({
          type: 'error',
          message: data.error || 'Erro ao enviar formulário',
        });
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Erro de conexão. Tente novamente mais tarde.',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Vamos Transformar Sua<br />
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Infraestrutura
            </span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Entre em contato para uma análise inicial da sua arquitetura cloud e práticas de DevOps
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-2xl p-8 shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Full Name */}
                <div>
                  <label htmlFor="fullName" className="block text-sm font-semibold text-gray-100 mb-2">
                    Nome Completo <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="João Silva"
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                  />
                  {errors.fullName && <p className="text-red-400 text-sm mt-1">{errors.fullName}</p>}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-100 mb-2">
                    E-mail Corporativo <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="joao@empresa.com"
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                  />
                  {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                </div>

                {/* Company Name */}
                <div>
                  <label htmlFor="company" className="block text-sm font-semibold text-gray-100 mb-2">
                    Nome da Empresa
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Sua Empresa Ltda"
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all"
                  />
                </div>

                {/* Bottleneck Select */}
                <div>
                  <label htmlFor="bottleneck" className="block text-sm font-semibold text-gray-100 mb-2">
                    Qual o principal gargalo atual?
                  </label>
                  <select
                    id="bottleneck"
                    name="bottleneck"
                    value={formData.bottleneck}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all appearance-none cursor-pointer"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2306b6d4' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 1rem center',
                      paddingRight: '2.5rem',
                    }}
                  >
                    {bottleneckOptions.map((option) => (
                      <option key={option.value} value={option.value} className="bg-slate-800">
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-100 mb-2">
                    Detalhes do Projeto <span className="text-cyan-400">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Descreva sua situação atual, objetivos e desafios técnicos..."
                    rows={5}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all resize-none"
                  />
                  <div className="flex justify-between mt-2">
                    <p className="text-sm text-gray-500">
                      {formData.message.length < 10 && (
                        <span className="text-red-400">Mínimo de 10 caracteres</span>
                      )}
                      {formData.message.length >= 10 && <span className="text-cyan-400">✓</span>}
                    </p>
                    <p className="text-sm text-gray-500">{formData.message.length} caracteres</p>
                  </div>
                  {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message}</p>}
                </div>

                {/* Status Messages */}
                {status.type === 'success' && (
                  <div className="bg-green-900/30 border border-green-600/50 rounded-lg p-4 flex items-start gap-3">
                    <CheckCircle className="text-green-400 flex-shrink-0 mt-0.5" size={20} />
                    <div>
                      <p className="font-semibold text-green-300">Mensagem Enviada!</p>
                      <p className="text-green-200 text-sm">{status.message}</p>
                    </div>
                  </div>
                )}

                {status.type === 'error' && (
                  <div className="bg-red-900/30 border border-red-600/50 rounded-lg p-4 flex items-start gap-3">
                    <AlertCircle className="text-red-400 flex-shrink-0 mt-0.5" size={20} />
                    <div>
                      <p className="font-semibold text-red-300">Erro</p>
                      <p className="text-red-200 text-sm">{status.message}</p>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status.type === 'loading'}
                  className="w-full py-3 px-4 bg-gradient-to-r from-cyan-400 to-purple-500 hover:from-cyan-300 hover:to-purple-400 text-slate-950 font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
                >
                  {status.type === 'loading' ? (
                    <>
                      <Loader size={20} className="animate-spin" />
                      <span>Enviando...</span>
                    </>
                  ) : (
                    <>
                      <span>Solicitar Análise Gratuita</span>
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </>
                  )}
                </button>

                {/* Trust Statement */}
                <p className="text-xs text-gray-500 text-center">
                  Seus dados são tratados com confidencialidade. Leia nossa{' '}
                  <a href="#" className="text-cyan-400 hover:text-cyan-300">
                    política de privacidade
                  </a>
                </p>
              </form>
            </div>
          </div>

          {/* Support Sidebar (Emanuel Profile) */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              
              {/* Profile Card / Sobre */}
              <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-xl border border-slate-700 rounded-2xl p-6 shadow-xl">
                <div className="border-b border-slate-700/60 pb-4 mb-4">
                  <h3 className="text-lg font-bold text-white mb-1">Emanuel</h3>
                  <p className="text-xs font-medium text-cyan-400 uppercase tracking-wider">
                    DevOps, Cloud & SRE
                  </p>
                </div>

                <div className="space-y-4 text-gray-300 text-sm leading-relaxed">
                  <p>
                    Olá! Sou o profissional de tecnologia focado em cultura{' '}
                    <span className="text-purple-400 font-medium">DevOps, Cloud Computing e Engenharia de Confiabilidade (SRE)</span>. 
                    Minha missão é desenhar e implementar arquiteturas de nuvem que sejam escaláveis, seguras, resilientes e totalmente automatizadas.
                  </p>
                  
                  <p>
                    Apoiado pela certificação <span className="text-cyan-400 font-medium inline-flex items-center gap-1"><Award size={14}/>AWS Certified Cloud Practitioner</span> — e expandindo meu escopo para a <em>AWS Certified Solutions Architect – Associate</em> —, atuo fortemente no ecossistema AWS e orquestração com Kubernetes.
                  </p>

                  <p className="text-xs italic text-gray-400 bg-slate-950/40 p-3 rounded-lg border border-slate-800">
                    "Movido pelo desafio de reduzir o Time-to-Market dos produtos, garantir resiliência e disseminar automação em ambientes corporativos."
                  </p>
                </div>

                {/* LinkedIn Button */}
                <a
                  href="https://www.linkedin.com/in/seu-perfil" // TODO: Substitua pelo seu link real do perfil público
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#0077B5] hover:bg-[#005582] text-white font-semibold rounded-lg transition-colors shadow-sm text-sm group"
                >
                  {/* SVG Nativo do LinkedIn */}
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  <span>Conectar no LinkedIn</span>
                  <span className="group-hover:translate-x-0.5 transition-transform text-xs opacity-70">↗</span>
                </a>
              </div>

              {/* Hard Skills & Tools Card */}
              <div className="bg-gradient-to-br from-slate-800/40 to-purple-950/20 backdrop-blur-xl border border-slate-700/60 rounded-2xl p-6 shadow-xl">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Cpu size={16} className="text-purple-400" />
                  Ecossistema Técnico
                </h4>
                
                <div className="space-y-3 text-xs text-gray-300">
                  <div>
                    <span className="block font-semibold text-gray-100 mb-1">Nuvem e Core:</span>
                    <p className="text-gray-400">AWS (EC2, S3, RDS, EKS, IAM) e Kubernetes (K8s)</p>
                  </div>
                  <div>
                    <span className="block font-semibold text-gray-100 mb-1">IaC / CI/CD:</span>
                    <p className="text-gray-400">Terraform, CloudFormation, GitLab CI e GitHub Actions</p>
                  </div>
                  <div>
                    <span className="block font-semibold text-gray-100 mb-1">Containers & Observabilidade:</span>
                    <p className="text-gray-400">Docker, Prometheus, Grafana, Zabbix, Loki e Kibana (ELK)</p>
                  </div>
                  <div>
                    <span className="block font-semibold text-gray-100 mb-1">Fundamentos:</span>
                    <p className="text-gray-400">Linux Avançado, Redes e Segurança da Informação</p>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}