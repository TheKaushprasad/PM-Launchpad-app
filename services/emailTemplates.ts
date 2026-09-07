/**
 * Branded transactional email templates for TheNoobPM
 * Built with responsive inline CSS and clean plain-text alternatives.
 */

export interface EmailTemplateResult {
  subject: string;
  html: string;
  text: string;
}

const BRAND_NAME = 'TheNoobPM';
const SUPPORT_EMAIL = 'support@thenoobpm.com';
const DOMAIN = 'https://www.thenoobpm.com';

/**
 * Shared email layout wrapper
 */
function wrapEmailLayout({
  title,
  preheader,
  contentHtml,
}: {
  title: string;
  preheader: string;
  contentHtml: string;
}): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>${title}</title>
  <!--[if mso]>
  <style type="text/css">
    body, table, td {font-family: Arial, Helvetica, sans-serif !important;}
  </style>
  <![endif]-->
</head>
<body style="margin: 0; padding: 0; background-color: #F1F5F9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; color: #1E293B;">
  <!-- Preheader text for email client snippet preview -->
  <div style="display: none; font-size: 1px; color: #F1F5F9; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
    ${preheader}
  </div>

  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #F1F5F9; padding: 32px 16px;">
    <tr>
      <td align="center">
        <!-- Main Card Container (Max Width 580px) -->
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 580px; background-color: #FFFFFF; border-radius: 16px; overflow: hidden; border: 1px solid #E2E8F0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05);">
          
          <!-- Header Banner -->
          <tr>
            <td style="background: linear-gradient(135deg, #0F172A 0%, #1E1B4B 60%, #1E3A8A 100%); padding: 32px 40px; text-align: left;">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td>
                    <!-- Text Logo with Accent Badge -->
                    <div style="display: inline-block; vertical-align: middle;">
                      <span style="font-size: 22px; font-weight: 800; color: #FFFFFF; letter-spacing: -0.5px; text-transform: uppercase;">TheNoob<span style="color: #60A5FA;">PM</span></span>
                    </div>
                    <div style="font-size: 12px; color: #94A3B8; margin-top: 4px; font-weight: 500; letter-spacing: 0.2px;">
                      Product Management Launchpad
                    </div>
                  </td>
                  <td align="right" style="vertical-align: middle;">
                    <span style="display: inline-block; background-color: rgba(255, 255, 255, 0.12); color: #F8FAFC; font-size: 11px; font-weight: 600; padding: 4px 10px; border-radius: 9999px; letter-spacing: 0.3px;">
                      AUTH SYSTEM
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Email Body Content -->
          <tr>
            <td style="padding: 40px 40px 32px 40px;">
              ${contentHtml}
            </td>
          </tr>

          <!-- Card Divider -->
          <tr>
            <td style="padding: 0 40px;">
              <div style="height: 1px; background-color: #E2E8F0; width: 100%;"></div>
            </td>
          </tr>

          <!-- Security & Help Notice -->
          <tr>
            <td style="padding: 24px 40px 32px 40px; background-color: #F8FAFC;">
              <p style="margin: 0 0 12px 0; font-size: 12px; line-height: 18px; color: #64748B;">
                Need assistance? Have questions? Reach out to us anytime at
                <a href="mailto:${SUPPORT_EMAIL}" style="color: #2563EB; text-decoration: none; font-weight: 500;">${SUPPORT_EMAIL}</a>.
              </p>
              <p style="margin: 0; font-size: 12px; line-height: 18px; color: #94A3B8;">
                &copy; ${new Date().getFullYear()} ${BRAND_NAME} &middot; <a href="${DOMAIN}" style="color: #94A3B8; text-decoration: none;">www.thenoobpm.com</a>
              </p>
            </td>
          </tr>

        </table>

        <!-- Subtle Unsubscribe / Anti-Phishing Footer -->
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 580px; margin-top: 20px;">
          <tr>
            <td align="center" style="font-size: 11px; color: #94A3B8; line-height: 16px;">
              This is an automated transactional security email sent to you by ${BRAND_NAME}.<br>
              Please never share verification or password reset links with anyone.
            </td>
          </tr>
        </table>

      </td>
    </tr>
  </table>
</body>
</html>`;
}

/**
 * 1. Email Verification Template
 */
export function getVerificationEmailTemplate({
  name,
  verificationUrl,
}: {
  name?: string;
  verificationUrl: string;
}): EmailTemplateResult {
  const greeting = name && name.trim() ? `Hi ${name.trim()},` : 'Hi there,';
  const preheader = 'Please verify your email address to activate your TheNoobPM account and access your workspace.';

  const contentHtml = `
    <h1 style="margin: 0 0 16px 0; font-size: 24px; font-weight: 800; color: #0F172A; line-height: 32px; letter-spacing: -0.5px;">
      Verify your email address
    </h1>
    
    <p style="margin: 0 0 20px 0; font-size: 15px; line-height: 24px; color: #334155;">
      ${greeting}
    </p>

    <p style="margin: 0 0 24px 0; font-size: 15px; line-height: 24px; color: #334155;">
      Thank you for creating your account with <strong>${BRAND_NAME}</strong>. Confirming your email helps us protect your account and ensures you get access to all tools, curriculum modules, and interview studios.
    </p>

    <!-- Primary Action Button -->
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin: 32px 0 28px 0;">
      <tr>
        <td align="center" style="border-radius: 10px; background-color: #2563EB;">
          <a href="${verificationUrl}" target="_blank" rel="noopener noreferrer" style="display: inline-block; padding: 14px 32px; font-size: 15px; font-weight: 700; color: #FFFFFF; text-decoration: none; border-radius: 10px; background-color: #2563EB; letter-spacing: 0.2px; text-align: center;">
            Verify Email Address &rarr;
          </a>
        </td>
      </tr>
    </table>

    <div style="background-color: #F8FAFC; border-left: 4px solid #3B82F6; padding: 14px 18px; border-radius: 0 8px 8px 0; margin-bottom: 24px;">
      <p style="margin: 0; font-size: 13px; line-height: 20px; color: #475569;">
        <strong>Note:</strong> This verification link will remain valid for <strong>24 hours</strong>. If you did not sign up for an account on ${BRAND_NAME}, you can safely ignore this email.
      </p>
    </div>

    <p style="margin: 0 0 8px 0; font-size: 13px; line-height: 20px; color: #64748B;">
      Button not working? Copy and paste this URL directly into your browser:
    </p>
    <p style="margin: 0; font-size: 12px; line-height: 18px; word-break: break-all;">
      <a href="${verificationUrl}" style="color: #2563EB; text-decoration: underline;">${verificationUrl}</a>
    </p>
  `;

  const html = wrapEmailLayout({
    title: `Verify your email - ${BRAND_NAME}`,
    preheader,
    contentHtml,
  });

  const text = `${greeting}

Thank you for signing up for ${BRAND_NAME}!

Please confirm your email address by visiting the following link:
${verificationUrl}

This link is valid for 24 hours.

If you did not sign up for ${BRAND_NAME}, you can safely disregard this message.

Best regards,
The TheNoobPM Team
https://www.thenoobpm.com`;

  return {
    subject: `Verify your email for ${BRAND_NAME}`,
    html,
    text,
  };
}

/**
 * 2. Password Reset Template
 */
export function getPasswordResetEmailTemplate({
  resetUrl,
}: {
  resetUrl: string;
}): EmailTemplateResult {
  const preheader = 'Follow this link to reset your TheNoobPM password.';

  const contentHtml = `
    <h1 style="margin: 0 0 16px 0; font-size: 24px; font-weight: 800; color: #0F172A; line-height: 32px; letter-spacing: -0.5px;">
      Reset your password
    </h1>

    <p style="margin: 0 0 20px 0; font-size: 15px; line-height: 24px; color: #334155;">
      Hi there,
    </p>

    <p style="margin: 0 0 24px 0; font-size: 15px; line-height: 24px; color: #334155;">
      We received a request to reset the password for your <strong>${BRAND_NAME}</strong> account. Click the button below to set a new password.
    </p>

    <!-- Primary Action Button -->
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin: 32px 0 28px 0;">
      <tr>
        <td align="center" style="border-radius: 10px; background-color: #2563EB;">
          <a href="${resetUrl}" target="_blank" rel="noopener noreferrer" style="display: inline-block; padding: 14px 32px; font-size: 15px; font-weight: 700; color: #FFFFFF; text-decoration: none; border-radius: 10px; background-color: #2563EB; letter-spacing: 0.2px; text-align: center;">
            Reset Password &rarr;
          </a>
        </td>
      </tr>
    </table>

    <div style="background-color: #FFFBEB; border-left: 4px solid #F59E0B; padding: 14px 18px; border-radius: 0 8px 8px 0; margin-bottom: 24px;">
      <p style="margin: 0; font-size: 13px; line-height: 20px; color: #92400E;">
        <strong>Security Notice:</strong> If you did not request a password reset, please ignore this email or contact support if you suspect unauthorized activity. Your current password remains safe and unchanged.
      </p>
    </div>

    <p style="margin: 0 0 8px 0; font-size: 13px; line-height: 20px; color: #64748B;">
      Button not working? Copy and paste this URL directly into your browser:
    </p>
    <p style="margin: 0; font-size: 12px; line-height: 18px; word-break: break-all;">
      <a href="${resetUrl}" style="color: #2563EB; text-decoration: underline;">${resetUrl}</a>
    </p>
  `;

  const html = wrapEmailLayout({
    title: `Reset your password - ${BRAND_NAME}`,
    preheader,
    contentHtml,
  });

  const text = `Hi there,

We received a request to reset the password for your ${BRAND_NAME} account.

To choose a new password, visit the link below:
${resetUrl}

If you didn't ask to reset your password, you can ignore this email. Your password will not change.

Best regards,
The TheNoobPM Team
https://www.thenoobpm.com`;

  return {
    subject: `Reset your password for ${BRAND_NAME}`,
    html,
    text,
  };
}

/**
 * 3. Welcome to TheNoobPM Template
 */
export function getWelcomeEmailTemplate({
  name,
  workspaceUrl = DOMAIN,
}: {
  name?: string;
  workspaceUrl?: string;
}): EmailTemplateResult {
  const greeting = name && name.trim() ? `Hi ${name.trim()}!` : 'Hi there!';
  const preheader = 'Welcome to TheNoobPM — your complete Product Management learning launchpad and career studio.';

  const contentHtml = `
    <div style="margin-bottom: 20px;">
      <span style="display: inline-block; background-color: #EEF2FF; color: #4338CA; font-size: 12px; font-weight: 700; padding: 6px 12px; border-radius: 9999px; text-transform: uppercase; letter-spacing: 0.5px;">
        🚀 Welcome to the Community
      </span>
    </div>

    <h1 style="margin: 0 0 16px 0; font-size: 26px; font-weight: 800; color: #0F172A; line-height: 34px; letter-spacing: -0.5px;">
      Welcome to TheNoobPM
    </h1>

    <p style="margin: 0 0 20px 0; font-size: 15px; line-height: 24px; color: #334155;">
      ${greeting} We are thrilled to have you here!
    </p>

    <p style="margin: 0 0 24px 0; font-size: 15px; line-height: 24px; color: #334155;">
      Breaking into and excelling at Product Management requires practical problem solving, execution frameworks, and continuous interview readiness. ${BRAND_NAME} gives you everything you need in one place:
    </p>

    <!-- 3 Key Highlights Grid -->
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin: 24px 0;">
      <tr>
        <td style="padding: 16px; background-color: #F8FAFC; border-radius: 12px; border: 1px solid #E2E8F0; margin-bottom: 12px;">
          <div style="font-size: 15px; font-weight: 700; color: #0F172A; margin-bottom: 4px;">
            📚 60-Day PM Curriculum
          </div>
          <div style="font-size: 13px; line-height: 20px; color: #64748B;">
            Structured daily lessons spanning Product Sense, Strategy, Technical Fundamentals, Metrics, AI, and Execution.
          </div>
        </td>
      </tr>
      <tr><td style="height: 12px;"></td></tr>
      <tr>
        <td style="padding: 16px; background-color: #F8FAFC; border-radius: 12px; border: 1px solid #E2E8F0;">
          <div style="font-size: 15px; font-weight: 700; color: #0F172A; margin-bottom: 4px;">
            🎯 AI Mock Interview Studio
          </div>
          <div style="font-size: 13px; line-height: 20px; color: #64748B;">
            Practice real product design, root cause analysis, and estimation cases with instant rubric-based scoring and feedback.
          </div>
        </td>
      </tr>
      <tr><td style="height: 12px;"></td></tr>
      <tr>
        <td style="padding: 16px; background-color: #F8FAFC; border-radius: 12px; border: 1px solid #E2E8F0;">
          <div style="font-size: 15px; font-weight: 700; color: #0F172A; margin-bottom: 4px;">
            ⚡ LinkedIn & Resume Optimizers
          </div>
          <div style="font-size: 13px; line-height: 20px; color: #64748B;">
            Benchmark your profile and CV against actual recruiter search criteria for your target role and seniority.
          </div>
        </td>
      </tr>
    </table>

    <!-- Primary Action Button -->
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin: 32px 0 20px 0;">
      <tr>
        <td align="center" style="border-radius: 10px; background-color: #2563EB;">
          <a href="${workspaceUrl}" target="_blank" rel="noopener noreferrer" style="display: inline-block; padding: 14px 32px; font-size: 15px; font-weight: 700; color: #FFFFFF; text-decoration: none; border-radius: 10px; background-color: #2563EB; letter-spacing: 0.2px; text-align: center;">
            Open Your PM Workspace &rarr;
          </a>
        </td>
      </tr>
    </table>

    <p style="margin: 0; font-size: 14px; line-height: 22px; color: #475569;">
      Here's to your PM journey,<br>
      <strong>Kaushal &amp; The TheNoobPM Team</strong>
    </p>
  `;

  const html = wrapEmailLayout({
    title: `Welcome to ${BRAND_NAME}`,
    preheader,
    contentHtml,
  });

  const text = `${greeting}

Welcome to ${BRAND_NAME}!

We are excited to support your Product Management career. Inside your workspace, you will find:
1. 60-Day PM Curriculum (Product Sense, Strategy, Tech, Metrics, Execution)
2. AI Mock Interview Studio (Case practice with rubric scoring)
3. LinkedIn & Resume Optimizers (Data-backed hiring criteria checks)

Open your workspace today:
${workspaceUrl}

Best regards,
The TheNoobPM Team
https://www.thenoobpm.com`;

  return {
    subject: `Welcome to ${BRAND_NAME} — Your Product Management Launchpad`,
    html,
    text,
  };
}
