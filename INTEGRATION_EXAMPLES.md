/**
 * Integration Examples for Contact Form API
 * 
 * This file contains examples of how to integrate the contact form
 * with popular services like email, databases, and CRM systems.
 */

// ============================================
// EMAIL INTEGRATION
// ============================================

/**
 * Example 1: Using Resend (Recommended for Next.js)
 * Install: npm install resend react-email
 */
export async function sendEmailWithResend(data: {
  fullName: string;
  email: string;
  company?: string;
  bottleneck: string;
  message: string;
}) {
  // const { Resend } = require('resend');
  // const resend = new Resend(process.env.RESEND_API_KEY);

  // try {
  //   // Send confirmation email to user
  //   await resend.emails.send({
  //     from: 'contact@consultoria.com',
  //     to: data.email,
  //     subject: 'Recebemos sua mensagem - Análise Gratuita',
  //     html: `
  //       <h2>Olá ${data.fullName}!</h2>
  //       <p>Obrigado por entrar em contato conosco.</p>
  //       <p>Nós analisaremos suas informações e retornaremos em até 4 horas úteis.</p>
  //       <hr>
  //       <p><strong>Seus dados:</strong></p>
  //       <ul>
  //         <li>Nome: ${data.fullName}</li>
  //         <li>Email: ${data.email}</li>
  //         <li>Empresa: ${data.company || 'Não informado'}</li>
  //         <li>Gargalo: ${data.bottleneck}</li>
  //       </ul>
  //     `,
  //   });

  //   // Send notification to your team
  //   await resend.emails.send({
  //     from: 'contact@consultoria.com',
  //     to: process.env.CONTACT_NOTIFICATION_EMAIL,
  //     subject: `[NOVO LEAD] ${data.fullName} - ${data.bottleneck}`,
  //     html: `
  //       <h3>Novo contato recebido!</h3>
  //       <p><strong>Nome:</strong> ${data.fullName}</p>
  //       <p><strong>Email:</strong> ${data.email}</p>
  //       <p><strong>Empresa:</strong> ${data.company || 'Não informado'}</p>
  //       <p><strong>Gargalo:</strong> ${data.bottleneck}</p>
  //       <hr>
  //       <p><strong>Mensagem:</strong></p>
  //       <p>${data.message.replace(/\n/g, '<br>')}</p>
  //       <hr>
  //       <a href="https://seu-crm.com/leads/${data.email}">
  //         Ver no CRM →
  //       </a>
  //     `,
  //   });

  //   return { success: true };
  // } catch (error) {
  //   console.error('Resend error:', error);
  //   throw error;
  // }
}

/**
 * Example 2: Using SendGrid
 * Install: npm install @sendgrid/mail
 */
export async function sendEmailWithSendGrid(data: any) {
  // const sgMail = require('@sendgrid/mail');
  // sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  // try {
  //   await sgMail.send({
  //     to: data.email,
  //     from: 'contact@consultoria.com',
  //     subject: 'Recebemos sua mensagem',
  //     html: `<h2>Obrigado, ${data.fullName}!</h2>...`,
  //   });
  // } catch (error) {
  //   console.error('SendGrid error:', error);
  //   throw error;
  // }
}

// ============================================
// DATABASE INTEGRATION
// ============================================

/**
 * Example 1: Using Prisma ORM (PostgreSQL, MySQL, SQLite, MongoDB)
 * Install: npm install @prisma/client
 * Setup: npx prisma init
 */
export async function saveContactWithPrisma(data: any) {
  // import { prisma } from '@/lib/prisma';

  // try {
  //   const contact = await prisma.contact.create({
  //     data: {
  //       fullName: data.fullName,
  //       email: data.email,
  //       company: data.company,
  //       bottleneck: data.bottleneck,
  //       message: data.message,
  //       submittedAt: new Date(),
  //       status: 'new', // Para rastrear status do lead
  //     },
  //   });

  //   return contact;
  // } catch (error) {
  //   console.error('Prisma error:', error);
  //   throw error;
  // }
}

/**
 * Example 2: Using MongoDB with Mongoose
 * Install: npm install mongoose
 */
export async function saveContactWithMongoDB(data: any) {
  // import { Contact } from '@/models/Contact';

  // try {
  //   const contact = await Contact.create({
  //     fullName: data.fullName,
  //     email: data.email,
  //     company: data.company,
  //     bottleneck: data.bottleneck,
  //     message: data.message,
  //     submittedAt: new Date(),
  //   });

  //   return contact;
  // } catch (error) {
  //   console.error('MongoDB error:', error);
  //   throw error;
  // }
}

/**
 * Example 3: Using Supabase (PostgreSQL)
 * Install: npm install @supabase/supabase-js
 */
export async function saveContactWithSupabase(data: any) {
  // import { createClient } from '@supabase/supabase-js';

  // const supabase = createClient(
  //   process.env.NEXT_PUBLIC_SUPABASE_URL,
  //   process.env.SUPABASE_SERVICE_ROLE_KEY
  // );

  // try {
  //   const { data: contact, error } = await supabase
  //     .from('contacts')
  //     .insert([
  //       {
  //         full_name: data.fullName,
  //         email: data.email,
  //         company: data.company,
  //         bottleneck: data.bottleneck,
  //         message: data.message,
  //         created_at: new Date(),
  //       },
  //     ]);

  //   if (error) throw error;
  //   return contact;
  // } catch (error) {
  //   console.error('Supabase error:', error);
  //   throw error;
  // }
}

// ============================================
// CRM INTEGRATION
// ============================================

/**
 * Example 1: Using HubSpot
 * Install: npm install @hubspot/api-client
 */
export async function createHubSpotLead(data: any) {
  // import hubspot from '@hubspot/api-client';

  // const hubspotClient = new hubspot.Client({
  //   accessToken: process.env.HUBSPOT_API_KEY,
  // });

  // try {
  //   const response = await hubspotClient.crm.contacts.basicApi.create({
  //     properties: [
  //       { name: 'firstname', value: data.fullName.split(' ')[0] },
  //       { name: 'lastname', value: data.fullName.split(' ').pop() },
  //       { name: 'email', value: data.email },
  //       { name: 'company', value: data.company },
  //       { name: 'message', value: data.message },
  //       { name: 'bottleneck', value: data.bottleneck },
  //     ],
  //   });

  //   return response;
  // } catch (error) {
  //   console.error('HubSpot error:', error);
  //   throw error;
  // }
}

/**
 * Example 2: Using Pipedrive
 * Install: npm install pipedrive
 */
export async function createPipedriveLead(data: any) {
  // import Pipedrive from 'pipedrive';

  // const pipedrive = new Pipedrive.Client({
  //   apiKey: process.env.PIPEDRIVE_API_KEY,
  // });

  // try {
  //   const person = await pipedrive.Persons.add({
  //     name: data.fullName,
  //     email: [{ value: data.email, primary: true }],
  //     org_id: data.company,
  //     custom_fields: {
  //       bottleneck: data.bottleneck,
  //       message: data.message,
  //     },
  //   });

  //   return person;
  // } catch (error) {
  //   console.error('Pipedrive error:', error);
  //   throw error;
  // }
}

/**
 * Example 3: Using Salesforce
 * Install: npm install jsforce
 */
export async function createSalesforceLead(data: any) {
  // import { Connection } from 'jsforce';

  // const conn = new Connection({
  //   instanceUrl: process.env.SALESFORCE_INSTANCE_URL,
  //   clientId: process.env.SALESFORCE_CLIENT_ID,
  //   clientSecret: process.env.SALESFORCE_CLIENT_SECRET,
  // });

  // try {
  //   const result = await conn.sobject('Lead').create({
  //     FirstName: data.fullName.split(' ')[0],
  //     LastName: data.fullName.split(' ').pop(),
  //     Email: data.email,
  //     Company: data.company,
  //     Description: data.message,
  //     // Custom field
  //     Bottleneck__c: data.bottleneck,
  //   });

  //   return result;
  // } catch (error) {
  //   console.error('Salesforce error:', error);
  //   throw error;
  // }
}

// ============================================
// SECURITY & RATE LIMITING
// ============================================

/**
 * Example: Rate limiting with Upstash Redis
 * Install: npm install @upstash/redis
 */
export async function checkRateLimit(email: string) {
  // import { Redis } from '@upstash/redis';

  // const redis = Redis.fromEnv();
  // const key = `contact:${email}`;

  // const count = await redis.incr(key);

  // if (count === 1) {
  //   // Set expiration to 24 hours
  //   await redis.expire(key, 86400);
  // }

  // // Limit to 5 submissions per day per email
  // if (count > 5) {
  //   return { allowed: false, message: 'Too many submissions' };
  // }

  // return { allowed: true };
}

/**
 * Example: reCAPTCHA v3 verification
 * Install: npm install node-fetch
 */
export async function verifyRecaptcha(token: string) {
  // try {
  //   const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  //     body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
  //   });

  //   const data = await response.json();

  //   // Require score of at least 0.5
  //   if (data.score < 0.5) {
  //     return { valid: false, message: 'reCAPTCHA verification failed' };
  //   }

  //   return { valid: true };
  // } catch (error) {
  //   console.error('reCAPTCHA error:', error);
  //   throw error;
  // }
}

// ============================================
// ANALYTICS & TRACKING
// ============================================

/**
 * Example: Tracking with PostHog
 * Install: npm install posthog-js
 */
export async function trackContactSubmission(data: any) {
  // import posthog from 'posthog-js';

  // posthog.capture('contact_form_submitted', {
  //   email: data.email,
  //   bottleneck: data.bottleneck,
  //   company: data.company,
  // });
}

// ============================================
// COMPLETE EXAMPLE: All integrations in one
// ============================================

/**
 * This is how you would use all integrations together in your API route
 */
export async function completeContactFlowExample(data: any) {
  // try {
  //   // 1. Verify reCAPTCHA
  //   // const recaptchaCheck = await verifyRecaptcha(data.recaptchaToken);
  //   // if (!recaptchaCheck.valid) return { error: 'Verification failed' };

  //   // 2. Check rate limit
  //   // const rateLimitCheck = await checkRateLimit(data.email);
  //   // if (!rateLimitCheck.allowed) return { error: 'Too many submissions' };

  //   // 3. Save to database
  //   // const contact = await saveContactWithPrisma(data);

  //   // 4. Create CRM lead
  //   // const lead = await createHubSpotLead(data);

  //   // 5. Send emails
  //   // await sendEmailWithResend(data);

  //   // 6. Track analytics
  //   // await trackContactSubmission(data);

  //   // return {
  //   //   success: true,
  //   //   message: 'Contact saved successfully',
  //   //   data: { contact, lead },
  //   // };
  // } catch (error) {
  //   console.error('Complete flow error:', error);
  //   throw error;
  // }
}
