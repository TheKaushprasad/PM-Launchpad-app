/**
 * Server-Side Resend Email Service for TheNoobPM
 * All Resend API calls MUST execute strictly on the Node.js Express server.
 * Never import this file into browser/client code.
 */

import { Resend } from 'resend';
import {
  getVerificationEmailTemplate,
  getPasswordResetEmailTemplate,
  getWelcomeEmailTemplate,
} from './emailTemplates';

const SENDER = 'TheNoobPM <no-reply@thenoobpm.com>';

let resendClient: Resend | null = null;

/**
 * Lazy initialization of the Resend client.
 * Fails fast with an informative error if RESEND_API_KEY is not configured.
 */
export function getResendClient(): Resend {
  if (!resendClient) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey || !apiKey.trim()) {
      throw new Error('RESEND_API_KEY environment variable is not configured on the server.');
    }
    resendClient = new Resend(apiKey.trim());
  }
  return resendClient;
}

/**
 * Helper to mask emails in server logs for privacy and security.
 * Example: "john.doe@example.com" -> "j***e@example.com"
 */
function maskEmail(email: string): string {
  if (!email) return '***';
  const parts = email.split('@');
  if (parts.length !== 2) return '***';
  const [user, domain] = parts;
  const maskedUser = user.length > 2 ? `${user[0]}***${user[user.length - 1]}` : `${user[0]}***`;
  return `${maskedUser}@${domain}`;
}

/**
 * Send custom branded verification email using Resend
 */
export async function sendVerificationEmailViaResend({
  to,
  name,
  verificationUrl,
}: {
  to: string;
  name?: string;
  verificationUrl: string;
}): Promise<{ id?: string }> {
  const resend = getResendClient();
  const template = getVerificationEmailTemplate({ name, verificationUrl });

  try {
    const response = await resend.emails.send({
      from: SENDER,
      to: [to.trim()],
      subject: template.subject,
      html: template.html,
      text: template.text,
    });

    if (response.error) {
      console.error(`[ResendService] Error sending verification email to ${maskEmail(to)}:`, response.error.message);
      throw new Error(`Email dispatch failed: ${response.error.message}`);
    }

    console.log(`[ResendService] Verification email sent to ${maskEmail(to)} (Email ID: ${response.data?.id})`);
    return { id: response.data?.id };
  } catch (err: any) {
    console.error(`[ResendService] Exception sending verification email to ${maskEmail(to)}:`, err?.message || err);
    throw err;
  }
}

/**
 * Send custom branded password reset email using Resend
 */
export async function sendPasswordResetEmailViaResend({
  to,
  resetUrl,
}: {
  to: string;
  resetUrl: string;
}): Promise<{ id?: string }> {
  const resend = getResendClient();
  const template = getPasswordResetEmailTemplate({ resetUrl });

  try {
    const response = await resend.emails.send({
      from: SENDER,
      to: [to.trim()],
      subject: template.subject,
      html: template.html,
      text: template.text,
    });

    if (response.error) {
      console.error(`[ResendService] Error sending password reset email to ${maskEmail(to)}:`, response.error.message);
      throw new Error(`Email dispatch failed: ${response.error.message}`);
    }

    console.log(`[ResendService] Password reset email sent to ${maskEmail(to)} (Email ID: ${response.data?.id})`);
    return { id: response.data?.id };
  } catch (err: any) {
    console.error(`[ResendService] Exception sending password reset email to ${maskEmail(to)}:`, err?.message || err);
    throw err;
  }
}

/**
 * Send custom branded welcome email using Resend
 */
export async function sendWelcomeEmailViaResend({
  to,
  name,
}: {
  to: string;
  name?: string;
}): Promise<{ id?: string }> {
  const resend = getResendClient();
  const template = getWelcomeEmailTemplate({ name });

  try {
    const response = await resend.emails.send({
      from: SENDER,
      to: [to.trim()],
      subject: template.subject,
      html: template.html,
      text: template.text,
    });

    if (response.error) {
      console.error(`[ResendService] Error sending welcome email to ${maskEmail(to)}:`, response.error.message);
      throw new Error(`Email dispatch failed: ${response.error.message}`);
    }

    console.log(`[ResendService] Welcome email sent to ${maskEmail(to)} (Email ID: ${response.data?.id})`);
    return { id: response.data?.id };
  } catch (err: any) {
    console.error(`[ResendService] Exception sending welcome email to ${maskEmail(to)}:`, err?.message || err);
    throw err;
  }
}
