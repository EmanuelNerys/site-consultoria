import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

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

    // 1. Validações de campos obrigatórios
    if (!body.email || !body.message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    if (body.message.trim().length < 10) {
      return NextResponse.json({ error: 'Message must be at least 10 characters' }, { status: 400 });
    }

    // === INICIALIZAÇÃO RUNTIME SEGURA ===
    // Instanciado estritamente dentro do método POST. O processo estático do 'next build' ignora essa linha.
    const resendApiKey = process.env.RESEND_API_KEY || 're_fallback_key_just_for_build';
    const resend = new Resend(resendApiKey);

    const toEmail = process.env.CONTACT_NOTIFICATION_EMAIL || 'emanuelnerys@gmail.com';

    // 2. Disparo do e-mail com Resend
    await resend.emails.send({
      from: 'NerysTech Portfolio <onboarding@resend.dev>',
      to: toEmail,
      replyTo: body.email,
      subject: `🚀 Novo contato técnico recebido no Portfólio!`,
      html: `
        <div style="font-family: sans-serif; padding: 30px; color: #0f172a; background-color: #f8fafc; border-radius: 16px; max-w: 600px; margin: 0 auto; border: 1px solid #e2e8f0;">
          <h2 style="color: #0ea5e9; border-bottom: 2px solid #0ea5e9; padding-bottom: 10px;">NerysTech — Novo Lead</h2>
          <div style="margin-top: 20px; background: #ffffff; padding: 20px; border-radius: 12px;">
            <p><strong>E-mail do cliente:</strong> ${body.email}</p>
            <hr style="border: 0; border-top: 1px solid #f1f5f9; margin: 20px 0;" />
            <div style="background-color: #f1f5f9; padding: 15px; border-radius: 8px; white-space: pre-wrap;">${body.message}</div>
          </div>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message: 'Obrigado por entrar em contato! Responderemos em até 4 horas úteis.',
    }, { status: 200 });

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ error: 'Ocorreu um erro ao processar sua solicitação.' }, { status: 500 });
  }
}