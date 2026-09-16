import type { APIRoute } from "astro";
import nodemailer from "nodemailer";
import type { ContactApiResponse, ContactFormData } from "../../types/contact";

export const prerender = false;

const CONTACT_RECIPIENT = import.meta.env.CONTACT_EMAIL_TO ?? "Info@movigas.com.ar";

function isValidPayload(data: Partial<ContactFormData>): data is ContactFormData {
  return (
    typeof data.nombre === "string" &&
    data.nombre.trim().length > 0 &&
    typeof data.email === "string" &&
    data.email.trim().length > 0 &&
    typeof data.asunto === "string" &&
    data.asunto.trim().length > 0 &&
    typeof data.mensaje === "string" &&
    data.mensaje.trim().length > 0
  );
}

function respond(status: number, body: ContactApiResponse) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export const POST: APIRoute = async ({ request }) => {
  let data: Partial<ContactFormData>;

  try {
    data = await request.json();
  } catch {
    return respond(400, { success: false, message: "Solicitud inválida." });
  }

  if (!isValidPayload(data)) {
    return respond(400, {
      success: false,
      message: "Completá todos los campos requeridos.",
    });
  }

  const { nombre, email, telefono, asunto, mensaje } = data;

  const gmailUser = import.meta.env.GMAIL_USER;
  const gmailAppPassword = import.meta.env.GMAIL_APP_PASSWORD;

  if (!gmailUser || !gmailAppPassword) {
    console.error(
      "Faltan las variables de entorno GMAIL_USER / GMAIL_APP_PASSWORD.",
    );
    return respond(500, {
      success: false,
      message: "El servicio de email no está configurado.",
    });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: gmailUser,
      pass: gmailAppPassword,
    },
  });

  try {
    await transporter.sendMail({
      from: `"${nombre}" <${gmailUser}>`,
      to: CONTACT_RECIPIENT,
      replyTo: email,
      subject: `[Web Contacto] ${asunto}`,
      text: [
        `Nombre: ${nombre}`,
        `Email: ${email}`,
        telefono ? `Teléfono: ${telefono}` : null,
        `Asunto: ${asunto}`,
        "",
        mensaje,
      ]
        .filter(Boolean)
        .join("\n"),
      html: `
        <div style="font-family: Arial, Helvetica, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f4f4f4; padding: 24px;">
          <div style="background-color: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #e5e5e5;">
            <div style="background-color: #dc2626; padding: 20px 24px;">
              <h1 style="margin: 0; color: #ffffff; font-size: 18px; font-weight: 600;">
                Nuevo mensaje de contacto
              </h1>
            </div>
            <div style="padding: 24px;">
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                <tr>
                  <td style="padding: 6px 0; color: #6b7280; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; width: 100px; vertical-align: top;">Nombre</td>
                  <td style="padding: 6px 0; color: #111827; font-size: 14px;">${nombre}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #6b7280; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; vertical-align: top;">Email</td>
                  <td style="padding: 6px 0; color: #111827; font-size: 14px;">
                    <a href="mailto:${email}" style="color: #dc2626; text-decoration: none;">${email}</a>
                  </td>
                </tr>
                ${
                  telefono
                    ? `<tr>
                  <td style="padding: 6px 0; color: #6b7280; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; vertical-align: top;">Teléfono</td>
                  <td style="padding: 6px 0; color: #111827; font-size: 14px;">${telefono}</td>
                </tr>`
                    : ""
                }
                <tr>
                  <td style="padding: 6px 0; color: #6b7280; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; vertical-align: top;">Asunto</td>
                  <td style="padding: 6px 0; color: #111827; font-size: 14px; font-weight: 600;">${asunto}</td>
                </tr>
              </table>
              <div style="border-top: 1px solid #e5e5e5; padding-top: 16px;">
                <p style="margin: 0 0 8px; color: #6b7280; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em;">Mensaje</p>
                <p style="margin: 0; color: #111827; font-size: 14px; line-height: 1.6;">${mensaje.replace(/\n/g, "<br />")}</p>
              </div>
            </div>
            <div style="background-color: #f9fafb; padding: 16px 24px; border-top: 1px solid #e5e5e5;">
              <p style="margin: 0; color: #9ca3af; font-size: 12px;">Enviado desde el formulario de contacto de movigas.com.ar</p>
            </div>
          </div>
        </div>
      `,
    });

    return respond(200, {
      success: true,
      message: "Mensaje enviado correctamente.",
    });
  } catch (error) {
    console.error("Error al enviar el email de contacto:", error);
    return respond(500, {
      success: false,
      message: "No se pudo enviar el mensaje. Intentá nuevamente más tarde.",
    });
  }
};
