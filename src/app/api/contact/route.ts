import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Inicializa o Resend com a chave que estará no seu .env.local
const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactFormData {
  email: string;
  message: string;
  fullName?: string;
  company?: string;
  bottleneck?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();

    // Validate required fields
    if (!body.email || !body.message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate message length
    if (body.message.trim().length < 10) {
      return NextResponse.json(
        { error: 'Message must be at least 10 characters' },
        { status: 400 }
      );
    }

    // Pega o e-mail de destino das ENVs ou usa o seu direto se estiver vazio
    const toEmail = process.env.CONTACT_NOTIFICATION_EMAIL || 'emanuelnerys@gmail.com';

    // === ENVIO DE E-MAIL COM RESEND ===
    await resend.emails.send({
      from: 'NerysTech Portfolio <onboarding@resend.dev>', // Domínio padrão gratuito do Resend
      to: toEmail,
      replyTo: body.email, // Se você respo,nder o e-mail vai direto para o cliente
      subject: `🚀 Novo contato técnico recebido no Portfólio!`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 30px; color: #0f172a; background-color: #f8fafc; border-radius: 16px; max-w: 600px; margin: 0 auto; border: 1px solid #e2e8f0;">
          <h2 style="color: #0ea5e9; margin-top: 0; font-size: 22px; border-bottom: 2px solid #0ea5e9; padding-bottom: 10px;">
            NerysTech — Novo Lead
          </h2>
          
          <div style="margin-top: 20px; background: #ffffff; padding: 20px; border-radius: 12px; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.05);">
            <p style="margin: 0 0 10px 0;"><strong>E-mail do cliente:</strong> <a href="mailto:${body.email}" style="color: #0ea5e9; text-decoration: none;">${body.email}</a></p>
            ${body.fullName ? `<p style="margin: 0 0 10px 0;"><strong>Nome:</strong> ${body.fullName}</p>` : ''}
            ${body.company ? `<p style="margin: 0 0 10px 0;"><strong>Empresa:</strong> ${body.company}</p>` : ''}
            ${body.bottleneck ? `<p style="margin: 0 0 10px 0;"><strong>Gargalo/Desafio:</strong> ${body.bottleneck}</p>` : ''}
            
            <hr style="border: 0; border-top: 1px solid #f1f5f9; margin: 20px 0;" />
            
            <p style="margin: 0 0 8px 0; font-weight: bold; color: #475569;">Detalhes da mensagem:</p>
            <div style="background-color: #f1f5f9; padding: 15px; border-radius: 8px; color: #334155; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${body.message}</div>
          </div>
          
          <p style="font-size: 11px; color: #94a3b8; text-align: center; margin-top: 25px; letter-spacing: 0.5px;">
            Enviado via API Next.js & Resend
          </p>
        </div>
      `,
    });

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: 'Obrigado por entrar em contato! Responderemos em até 4 horas úteis.',
        data: {
          timestamp: new Date().toISOString(),
          email: body.email,
        },
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Ocorreu um erro ao processar sua solicitação.' },
      { status: 500 }
    );
  }
}