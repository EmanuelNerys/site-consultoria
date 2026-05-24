'use client';

import { useState, FormEvent, ChangeEvent, FocusEvent } from 'react';
import { CheckCircle, AlertCircle, Loader, Cpu } from 'lucide-react';

interface FormData {
  email: string;
  message: string;
}

interface FormStatus {
  type: 'idle' | 'loading' | 'success' | 'error';
  message?: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    message: '',
  });

  const [status, setStatus] = useState<FormStatus>({ type: 'idle' });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

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

  const handleBlur = (
    e: FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name } = e.target as HTMLInputElement & HTMLTextAreaElement & HTMLSelectElement;
    setTouched((prev) => ({ ...prev, [name]: true }));
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
          email: '',
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
    <div id="contact" className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 rounded-3xl bg-slate-900/70 p-8 text-center text-slate-300 shadow-lg shadow-slate-950/20">
          <p className="text-xs uppercase tracking-[0.32em] text-cyan-300">Entre em contato</p>
          <h2 className="mt-4 text-3xl sm:text-4xl font-semibold text-white">
            Vamos conversar sobre a sua plataforma.
          </h2>
          <p className="mt-4 mx-auto max-w-2xl text-slate-400">
            Aberto a vagas sênior em DevOps e Engenharia de Plataforma, e a consultoria a partir de duas semanas.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_340px] gap-6">
          {/* Contact Form */}
          <div>
            <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-2xl p-8 shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-100 mb-2">
                    Email <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="seu@email.com"
                    className="w-full rounded-2xl border border-slate-700 bg-slate-900/80 px-4 py-4 text-white placeholder:text-slate-500 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                  />
                  {errors.email && <p className="mt-2 text-sm text-red-400">{errors.email}</p>}
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
                    onBlur={handleBlur}
                    placeholder="Uma frase sobre o problema que você está resolvendo."
                    rows={6}
                    className="w-full rounded-2xl border border-slate-700 bg-slate-900/80 px-4 py-4 text-white placeholder:text-slate-500 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 resize-none"
                  />
                  <div className="flex justify-between mt-2">
                    <p className="text-sm text-gray-500">
                      {touched.message && formData.message.length < 10 && (
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
                  className="w-full rounded-2xl bg-gradient-to-r from-orange-500 to-pink-500 px-6 py-4 text-sm font-semibold text-slate-950 transition hover:from-orange-400 hover:to-pink-400 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status.type === 'loading' ? 'Enviando...' : 'Enviar mensagem'}
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
            <div className="sticky top-6 space-y-4">
              
              {/* Profile Card / Sobre */}
              <div className="bg-slate-900/95 backdrop-blur-xl border border-slate-700 rounded-2xl p-4 shadow-xl shadow-slate-950/20">
                <div className="border-b border-slate-700/70 pb-3 mb-3">
                  <h3 className="text-base font-semibold text-white mb-0.5">Emanuel</h3>
                  <p className="text-[10px] font-medium text-cyan-300 uppercase tracking-[0.3em]">DevOps, Cloud & SRE</p>
                </div>

                {/* Descrição do perfil removida por solicitação - mantido apenas nome, cargo e contatos */}

                <div className="mt-4 grid gap-2 text-sm text-gray-200">
                  <div className="rounded-2xl bg-slate-950/70 border border-slate-700 p-3">
                    <p className="text-[10px] uppercase tracking-[0.25em] text-slate-400 mb-1">Email</p>
                    <a href="mailto:emanuelnerys@gmail.com" className="block text-cyan-300 font-medium hover:text-cyan-200 break-all text-sm">
                      emanuelnerys@gmail.com
                    </a>
                  </div>
                  <div className="rounded-2xl bg-slate-950/70 border border-slate-700 p-3">
                    <p className="text-[10px] uppercase tracking-[0.25em] text-slate-400 mb-1">LinkedIn</p>
                    <a href="https://www.linkedin.com/in/emanuel-nerys" target="_blank" rel="noopener noreferrer" className="block text-cyan-300 font-medium hover:text-cyan-200 break-all text-sm">
                      linkedin.com/in/emanuel-nerys
                    </a>
                  </div>
                  <div className="rounded-2xl bg-slate-950/70 border border-slate-700 p-3">
                    <p className="text-[10px] uppercase tracking-[0.25em] text-slate-400 mb-1">Localização</p>
                    <p className="font-medium text-white text-sm">João Pessoa, PB</p>
                  </div>
                </div>
              </div>

              {/* Hard Skills & Tools Card */}
              {/* Ecossistema Técnico removido por solicitação - mantemos apenas contato (email/linkedin/localização) */}

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}