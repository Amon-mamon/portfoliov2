import { buildContactEmailHtml } from '@/constants/template';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  const body = await request.json();

  // 🛡️ Safe on server
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD || process.env.EMAIL_PASSWORD2,
    },
  });

  try {
    await transporter.sendMail({
      from: `"${body.name}" <${process.env.EMAIL_USER}>`, // must be YOUR authenticated address
      replyTo: body.email, // visitor's email — hitting "Reply" goes to them
      to: process.env.EMAIL_USER,
      subject: `New Message from ${body.name}`,
      text: body.message, // plain-text fallback for clients that don't render HTML
      html: buildContactEmailHtml({
        name: body.name,
        email: body.email,
        message: body.message,
        inquiryType: body.inquiryType,
      }),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email send failed:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}