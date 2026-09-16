export interface ContactFormData {
  nombre: string;
  email: string;
  telefono?: string;
  asunto: string;
  mensaje: string;
}

export interface ContactApiResponse {
  success: boolean;
  message: string;
}
