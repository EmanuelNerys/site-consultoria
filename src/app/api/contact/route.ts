import { NextRequest, NextResponse } from 'next/server';

interface ContactFormData {
  fullName: string;
  email: string;
  company?: string;
  bottleneck: string;
  message: string;
}

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

    // TODO: Save to database or send email
    // This is where you would:
    // 1. Save to a database (MongoDB, PostgreSQL, etc.)
    // 2. Send a confirmation email to the user
    // 3. Send a notification email to your team
    // 4. Integrate with your CRM system

    console.log('Contact form received:', {
      timestamp: new Date().toISOString(),
      ...body,
    });

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: 'Thank you for reaching out! We will contact you within 4 business hours.',
        data: {
          timestamp: new Date().toISOString(),
          fullName: body.fullName,
          email: body.email,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'An error occurred while processing your request' },
      { status: 500 }
    );
  }
}
