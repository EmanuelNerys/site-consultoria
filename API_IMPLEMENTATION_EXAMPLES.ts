/**
 * EXAMPLE: Complete API Route Implementation with Integrations
 * 
 * This file shows how to enhance the current route.ts with real integrations.
 * Uncomment the code and install the dependencies as needed.
 */

import { NextRequest, NextResponse } from 'next/server';

// Types
interface ContactFormData {
  fullName: string;
  email: string;
  company?: string;
  bottleneck: string;
  message: string;
}

// ============================================
// OPTION 1: Using Prisma + Resend Email
// ============================================

/**
 * Installation:
 * npm install @prisma/client resend
 * npx prisma init
 * npx prisma migrate dev --name init
 */

// Uncomment if using this approach:
/*
import { prisma } from '@/lib/prisma';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();

    // Validate required fields
    if (!body.fullName || !body.email || !body.message || !body.bottleneck) {
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

    // Save to database
    const contact = await prisma.contact.create({
      data: {
        fullName: body.fullName,
        email: body.email,
        company: body.company || null,
        bottleneck: body.bottleneck,
        message: body.message,
        status: 'NEW',
        submittedAt: new Date(),
      },
    });

    // Send confirmation email to user
    await resend.emails.send({
      from: 'contact@consultoria.com',
      to: body.email,
      subject: 'Recebemos sua solicitação de análise gratuita',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #06b6d4;">Obrigado, ${body.fullName}!</h2>
          
          <p>Recebemos sua solicitação de análise gratuita de arquitetura cloud.</p>
          
          <p>Nosso time está analisando as informações enviadas e retornaremos <strong>em até 4 horas úteis</strong> com recomendações personalizadas para seu cenário.</p>
          
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
          
          <h3 style="color: #333;">Informações Recebidas:</h3>
          <ul style="color: #666;">
            <li><strong>Nome:</strong> ${body.fullName}</li>
            <li><strong>Email:</strong> ${body.email}</li>
            <li><strong>Empresa:</strong> ${body.company || 'Não informado'}</li>
            <li><strong>Gargalo Principal:</strong> ${body.bottleneck}</li>
          </ul>
          
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
          
          <p style="color: #999; font-size: 12px;">
            Seus dados estão protegidos conforme nossa <a href="https://consultoria.com/privacy" style="color: #06b6d4;">política de privacidade</a> e NDA.
          </p>
        </div>
      `,
    });

    // Send notification to your team
    await resend.emails.send({
      from: 'contact@consultoria.com',
      to: process.env.CONTACT_NOTIFICATION_EMAIL || 'leads@consultoria.com',
      subject: `[NOVO LEAD] ${body.fullName} - ${body.bottleneck}`,
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2 style="color: #a855f7;">Novo Lead Recebido!</h2>
          
          <p><strong>Nome:</strong> ${body.fullName}</p>
          <p><strong>Email:</strong> ${body.email}</p>
          <p><strong>Empresa:</strong> ${body.company || 'Não informado'}</p>
          <p><strong>Gargalo:</strong> ${body.bottleneck}</p>
          <p><strong>ID no Banco:</strong> ${contact.id}</p>
          
          <hr />
          
          <p><strong>Mensagem:</strong></p>
          <p style="background: #f3f4f6; padding: 10px; border-left: 4px solid #06b6d4;">
            ${body.message.replace(/\n/g, '<br>')}
          </p>
          
          <hr />
          
          <p>
            <a href="https://seu-crm.com/contacts/${contact.id}" 
               style="display: inline-block; background: #06b6d4; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
              Ver no Dashboard →
            </a>
          </p>
        </div>
      `,
    });

    // Log the submission
    console.log('✅ Contact saved:', {
      id: contact.id,
      email: contact.email,
      timestamp: contact.submittedAt,
    });

    return NextResponse.json(
      {
        success: true,
        message:
          'Obrigado! Nós analisaremos sua solicitação e retornaremos em até 4 horas úteis.',
        data: {
          timestamp: contact.submittedAt.toISOString(),
          fullName: contact.fullName,
          email: contact.email,
          id: contact.id,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('❌ Contact form error:', error);

    // More specific error handling
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: 'Invalid request format' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'An error occurred while processing your request' },
      { status: 500 }
    );
  }
}
*/

// ============================================
// OPTION 2: Using Supabase + Resend
// ============================================

/**
 * Installation:
 * npm install @supabase/supabase-js resend
 */

// Uncomment if using this approach:
/*
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();

    // Validate...
    if (!body.fullName || !body.email || !body.message || !body.bottleneck) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    if (body.message.trim().length < 10) {
      return NextResponse.json(
        { error: 'Message must be at least 10 characters' },
        { status: 400 }
      );
    }

    // Save to Supabase
    const { data, error } = await supabase
      .from('contacts')
      .insert([
        {
          full_name: body.fullName,
          email: body.email,
          company: body.company,
          bottleneck: body.bottleneck,
          message: body.message,
          status: 'new',
          created_at: new Date().toISOString(),
        },
      ])
      .select();

    if (error) throw error;

    // Send emails...
    await resend.emails.send({
      from: 'contact@consultoria.com',
      to: body.email,
      subject: 'Recebemos sua solicitação',
      html: `<h2>Obrigado, ${body.fullName}!</h2>...`,
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Obrigado! Retornaremos em até 4 horas úteis.',
        data: data?.[0],
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Supabase error:', error);
    return NextResponse.json(
      { error: 'An error occurred while processing your request' },
      { status: 500 }
    );
  }
}
*/

// ============================================
// OPTION 3: Using MongoDB + SendGrid
// ============================================

/**
 * Installation:
 * npm install mongoose @sendgrid/mail
 */

// Uncomment if using this approach:
/*
import mongoose from 'mongoose';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

// Connect to MongoDB
if (mongoose.connection.readyState === 0) {
  mongoose.connect(process.env.MONGODB_URI!);
}

// Define schema
const contactSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  company: String,
  bottleneck: String,
  message: String,
  createdAt: { type: Date, default: Date.now },
});

const Contact =
  mongoose.models.Contact || mongoose.model('Contact', contactSchema);

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();

    // Validate...
    if (!body.fullName || !body.email || !body.message || !body.bottleneck) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Save to MongoDB
    const contact = await Contact.create({
      fullName: body.fullName,
      email: body.email,
      company: body.company,
      bottleneck: body.bottleneck,
      message: body.message,
    });

    // Send emails with SendGrid
    await sgMail.send({
      to: body.email,
      from: 'contact@consultoria.com',
      subject: 'Recebemos sua solicitação',
      html: `<h2>Obrigado, ${body.fullName}!</h2>...`,
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Obrigado! Retornaremos em breve.',
        data: contact,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('MongoDB error:', error);
    return NextResponse.json(
      { error: 'An error occurred while processing your request' },
      { status: 500 }
    );
  }
}
*/

// ============================================
// CURRENT SIMPLE IMPLEMENTATION
// ============================================

/**
 * The current working implementation that just validates and logs.
 * Use the examples above to add real integrations.
 */

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();

    // Validate required fields
    if (!body.fullName || !body.email || !body.message || !body.bottleneck) {
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

    // Log submission (in production, save to database)
    console.log('✅ Contact form submission received:', {
      timestamp: new Date().toISOString(),
      ...body,
    });

    return NextResponse.json(
      {
        success: true,
        message:
          'Obrigado por entrar em contato! Nós analisaremos suas informações e retornaremos em até 4 horas úteis.',
        data: {
          timestamp: new Date().toISOString(),
          fullName: body.fullName,
          email: body.email,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('❌ Contact form error:', error);
    return NextResponse.json(
      { error: 'An error occurred while processing your request' },
      { status: 500 }
    );
  }
}
