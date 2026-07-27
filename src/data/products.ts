import type { Product } from "../types/product";

export const products: Product[] = [
  {
    slug: "amoniaco-anhidro",
    name: "Amoniaco Anhidro",
    tagline: "Comercialización, fraccionamiento y distribución a granel",
    description:
      "Comercializamos Amoniaco Anhidro a granel para el mercado nacional e internacional. Contamos con planta de fraccionamiento propia, flota especializada y más de seis décadas de experiencia en el manejo seguro de sustancias peligrosas.",
    applications: [
      "Fabricación de fertilizantes",
      "Tratamiento térmico de metales",
      "Refrigerante industrial",
      "Elaboración de fármacos",
      "Tratamiento de residuos",
    ],
    presentations: ["Amoniaco a granel", "Cilindros de 45 kg"],
    services: [
      {
        title: "Fraccionamiento",
        description:
          "Realizado en planta propia con estándares técnicos y de seguridad. Los cilindros de 45 kg pueden ser propiedad de Movigas o del cliente, previa verificación de calidad.",
      },
      {
        title: "Distribución a granel",
        description:
          "Para empresas con alto consumo, el producto se almacena en tanques propios del cliente o mediante alquiler de tanques fijos provistos por la empresa.",
      },
      {
        title: "Vaciado de circuitos",
        description:
          "Servicio especializado que permite la realización de tareas de mantenimiento, paradas de planta y trabajos en caliente con total seguridad.",
      },
    ],
    coverage: "Mercado nacional y MERCOSUR",
    pdfs: {
      fichaTecnica: "/pdf/amoniaco-anhidro-ficha-tecnica.pdf",
      fichaSeguridad: "/pdf/amoniaco-anhidro-ficha-seguridad.pdf",
    },
  },
  {
    slug: "agua-amoniacal",
    name: "Agua Amoniacal",
    tagline: "Solución amoniacal de alta calidad por osmosis inversa",
    description:
      "Producimos Agua Amoniacal formulada a partir de agua tratada por osmosis inversa, garantizando alta y uniforme calidad. Ofrecemos formulaciones personalizadas según las densidades requeridas por cada cliente, para mercado interno y externo.",
    applications: [
      "Curtido de cueros",
      "Formulación de detergentes",
      "Sulfonación de lavandina",
      "Fabricación de levaduras para consumo humano",
      "Fertilizantes líquidos",
    ],
    presentations: [
      "Entrega a granel",
      "Envases propios o del cliente",
      "Múltiples capacidades disponibles",
    ],
    services: [
      {
        title: "Formulación personalizada",
        description:
          "Ajustamos la densidad del producto según los requerimientos específicos de cada cliente, garantizando consistencia lote a lote.",
      },
      {
        title: "Transporte dedicado",
        description:
          "Contamos con flota dedicada exclusivamente al transporte de agua amoniacal, evitando contaminación cruzada. Personal y equipos cumplen con todas las regulaciones vigentes.",
      },
    ],
    coverage: "Mercado nacional e internacional",
    pdfs: {
      fichaTecnica: "/pdf/agua-amoniacal-ficha-tecnica.pdf",
      fichaSeguridad: "/pdf/agua-amoniacal-ficha-seguridad.pdf",
    },
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
