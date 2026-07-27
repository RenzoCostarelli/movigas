export interface ProductPdf {
  fichaTecnica: string;
  fichaSeguridad: string;
}

export interface ProductService {
  title: string;
  description: string;
}

export interface Product {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  applications: string[];
  presentations: string[];
  services: ProductService[];
  coverage: string;
  pdfs: ProductPdf;
}
