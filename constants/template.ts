// lib/emailTemplate.ts
// Generates the HTML body for the "New Message" notification email.
// Inline styles only — email clients (esp. Gmail) strip <style> blocks
// and don't support flexbox/grid reliably, so tables + inline CSS it is.

export function buildContactEmailHtml({
  name,
  email,
  message,
  inquiryType,
}: {
  name: string;
  email: string;
  message: string;
  inquiryType?: string;
}) {
  // Basic escaping so a message containing < or > doesn't break the HTML
  const escape = (str: string) =>
    str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  // Map raw inquiryType values (from Contact.tsx's button ids) to display
  // labels + a badge color, matching the pill buttons on the form itself.
  const inquiryLabels: Record<string, { label: string; color: string }> = {
    project: { label: 'Project Inquiry', color: '#007acc' },
    freelance: { label: 'Freelance / Contract', color: '#4ec9b0' },
    fulltime: { label: 'Full-Time Role', color: '#e5c07b' },
  };
  const inquiry = inquiryType
    ? inquiryLabels[inquiryType] ?? { label: escape(inquiryType), color: '#808080' }
    : null;

  return `
<!DOCTYPE html>
<html>
  <body style="margin:0; padding:0; background-color:#1e1e1e; font-family: 'Courier New', Courier, monospace;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#1e1e1e; padding: 32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background-color:#181818; border:1px solid #2b2b2b; border-radius:8px; overflow:hidden;">

            <!-- Title bar -->
            <tr>
              <td style="background-color:#252526; padding:12px 20px; border-bottom:1px solid #2b2b2b;">
                <span style="color:#4ec9b0; font-size:13px; font-weight:bold;">&#9679;&#9679;&#9679; new-message.json</span>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:24px 20px;">
                <p style="color:#808080; font-size:12px; margin:0 0 16px 0;">
                  // New contact form submission
                </p>

                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:8px;">
                  ${
                    inquiry
                      ? `<tr>
                    <td style="color:#9cdcfe; font-size:13px; width:110px; vertical-align:top; padding:6px 0;">"inquiry_type":</td>
                    <td style="padding:6px 0;">
                      <span style="display:inline-block; background-color:${inquiry.color}22; color:${inquiry.color}; border:1px solid ${inquiry.color}; border-radius:12px; padding:2px 10px; font-size:12px; font-weight:bold;">${inquiry.label}</span>
                    </td>
                  </tr>`
                      : ''
                  }
                  <tr>
                    <td style="color:#9cdcfe; font-size:13px; width:110px; vertical-align:top; padding:6px 0;">"sender_name":</td>
                    <td style="color:#ce9178; font-size:13px; padding:6px 0;">"${escape(name)}"</td>
                  </tr>
                  <tr>
                    <td style="color:#9cdcfe; font-size:13px; width:110px; vertical-align:top; padding:6px 0;">"sender_email":</td>
                    <td style="color:#ce9178; font-size:13px; padding:6px 0;">
                      <a href="mailto:${escape(email)}" style="color:#ce9178; text-decoration:none;">"${escape(email)}"</a>
                    </td>
                  </tr>
                </table>

                <p style="color:#9cdcfe; font-size:13px; margin:16px 0 8px 0;">"message_body":</p>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#1e1e1e; border:1px solid #3c3c3c; border-radius:4px;">
                  <tr>
                    <td style="padding:14px; color:#d4d4d4; font-size:13px; line-height:1.6; white-space:pre-wrap;">
                      ${escape(message)}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Footer / reply hint -->
            <tr>
              <td style="background-color:#1e1e1e; padding:14px 20px; border-top:1px solid #2b2b2b;">
                <span style="color:#569cd6; font-size:11px;">&#8250;</span>
                <span style="color:#808080; font-size:11px;">
                  Reply directly to this email to respond to ${escape(name)}.
                </span>
              </td>
            </tr>

          </table>

          <p style="color:#3c3c3c; font-size:11px; margin-top:16px; font-family: 'Courier New', Courier, monospace;">
            Sent from your portfolio contact form
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>
  `;
}