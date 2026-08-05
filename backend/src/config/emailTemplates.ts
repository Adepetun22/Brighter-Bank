export function verificationEmailHtml(firstName: string, verifyUrl: string) {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="margin:0;padding:0;background:#f0f4ff;font-family:sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr><td align="center" style="padding:40px 16px;">
      <table width="520" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #dde5f4;">
        <tr><td style="background:#004ac6;padding:32px 40px;">
          <p style="margin:0;color:#ffffff;font-size:22px;font-weight:700;">Brighter Bank</p>
        </td></tr>
        <tr><td style="padding:40px;">
          <p style="margin:0 0 8px;font-size:22px;font-weight:700;color:#0d1b3e;">Hi ${firstName},</p>
          <p style="margin:0 0 24px;font-size:15px;color:#4b5a7a;line-height:1.6;">
            Thanks for opening an account with Brighter Bank. Please verify your email address to activate your account.
          </p>
          <a href="${verifyUrl}"
            style="display:inline-block;background:#004ac6;color:#ffffff;text-decoration:none;font-size:15px;font-weight:600;padding:14px 32px;border-radius:6px;">
            Verify Email Address
          </a>
          <p style="margin:24px 0 0;font-size:13px;color:#8a96b0;line-height:1.6;">
            This link expires in 24 hours. If you didn't create an account, you can safely ignore this email.
          </p>
        </td></tr>
        <tr><td style="padding:20px 40px;border-top:1px solid #dde5f4;">
          <p style="margin:0;font-size:12px;color:#8a96b0;">© ${new Date().getFullYear()} Brighter Bank. All rights reserved.</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}
