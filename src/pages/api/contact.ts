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
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${telefono ? `<p><strong>Teléfono:</strong> ${telefono}</p>` : ""}
        <p><strong>Asunto:</strong> ${asunto}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${mensaje.replace(/\n/g, "<br />")}</p>
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
