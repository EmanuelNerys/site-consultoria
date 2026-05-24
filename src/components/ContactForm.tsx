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
    <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-sm text-slate-300 text-center">
          Preencha o formulário abaixo para solicitar sua análise gratuita.
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
              <div className="bg-slate-900/95 backdrop-blur-xl border border-slate-700 rounded-3xl p-6 shadow-xl shadow-slate-950/30">
                <div className="border-b border-slate-700/70 pb-4 mb-4">
                  <h3 className="text-lg font-semibold text-white mb-1">Emanuel</h3>
                  <p className="text-xs font-medium text-cyan-300 uppercase tracking-[0.3em]">DevOps, Cloud & SRE</p>
                </div>

                <div className="space-y-4 text-gray-300 text-sm leading-relaxed">
                  <p>
                    Sou profissional de DevOps, Cloud e SRE com foco em AWS e Kubernetes. Ajudo equipes a implantar automação e confiabilidade na nuvem.
                  </p>

                  <p>
                    Certificado AWS Certified Cloud Practitioner e em transição para AWS Certified Solutions Architect – Associate.
                  </p>

                  <p className="text-xs italic text-slate-400 bg-slate-950/40 p-3 rounded-2xl border border-slate-800">
                    "Reduzo o Time-to-Market com operações seguras, resilientes e previsíveis."
                  </p>
                </div>

                <div className="mt-6 grid gap-3 text-sm text-gray-200">
                  <div className="rounded-2xl bg-slate-950/70 border border-slate-700 p-4">
                    <p className="text-[11px] uppercase tracking-[0.25em] text-slate-400 mb-2">Email</p>
                    <a href="mailto:emanuelnerys@gmail.com" className="block text-cyan-300 font-medium hover:text-cyan-200 break-all">
                      emanuelnerys@gmail.com
                    </a>
                  </div>
                  <div className="rounded-2xl bg-slate-950/70 border border-slate-700 p-4">
                    <p className="text-[11px] uppercase tracking-[0.25em] text-slate-400 mb-2">LinkedIn</p>
                    <a href="https://www.linkedin.com/in/emanuel-nerys" target="_blank" rel="noopener noreferrer" className="block text-cyan-300 font-medium hover:text-cyan-200 break-all">
                      linkedin.com/in/emanuel-nerys
                    </a>
                  </div>
                  <div className="rounded-2xl bg-slate-950/70 border border-slate-700 p-4">
                    <p className="text-[11px] uppercase tracking-[0.25em] text-slate-400 mb-2">Localização</p>
                    <p className="font-medium text-white">João Pessoa, PB</p>
                  </div>
                </div>
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