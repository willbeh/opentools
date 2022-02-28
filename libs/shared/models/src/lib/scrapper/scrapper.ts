export interface Scrapper {
  title?: string;
  meta?: {
    keywords?: string;
    description?: string;
    imageurl?: string;
    ogtitle?: string;
    ogimage?: string;
    ogdescription?: string;
  };
  h1?: ScapperDetail[];
  h2?: ScapperDetail[];
  h3?: ScapperDetail[];
  p?: ScapperDetail[];
  img?: ScapperImage[];
  [key: string]: unknown;
}

export interface ScapperDetail {
  id?: string;
  class?: string;
  text?: string;
}

export interface ScapperImage {
  id?: string;
  class?: string;
  alt?: string;
  src?: string;
}
