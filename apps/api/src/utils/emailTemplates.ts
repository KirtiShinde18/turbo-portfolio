type AdminTemplateParams = {
  name: string;
  email: string;
  message: string;
};

type UserTemplateParams = {
  name: string;
  message: string;
};

// 📩 ADMIN TEMPLATE
export const adminTemplate = ({
  name,
  email,
  message,
}: AdminTemplateParams): string => {
  return `
  <div style="font-family: Arial; padding:20px;">
    <h2 style="color:#4f46e5;">📩 New Contact Message</h2>

    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>

    <div style="margin-top:15px; padding:10px; background:#f3f4f6; border-radius:8px;">
      ${message}
    </div>
  </div>
  `;
};

// 📩 USER TEMPLATE
export const userTemplate = ({
  name,
  message,
}: UserTemplateParams): string => {
  return `
  <div style="font-family: Arial; padding:20px;">

    <h2 style="color:#4f46e5;">Hey ${name} 👋</h2>

    <p>Thanks for contacting me. I will get back to you soon.</p>

    <div style="margin-top:15px; padding:10px; background:#eef2ff; border-radius:8px;">
      ${message}
    </div>

    <p style="margin-top:20px;">
      Regards,<br/>
      <strong>Kirti Shinde</strong>
    </p>
  </div>
  `;
};