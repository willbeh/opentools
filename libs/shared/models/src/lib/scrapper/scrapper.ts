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
  h1?: ScrapperDetail[];
  h2?: ScrapperDetail[];
  h3?: ScrapperDetail[];
  p?: ScrapperDetail[];
  img?: ScrapperImage[];
  a?: ScrapperLink[];
  [key: string]: unknown;
}

export interface ScrapperDetail {
  id?: string;
  class?: string;
  text?: string;
}

export interface ScrapperImage {
  id?: string;
  class?: string;
  alt?: string;
  src?: string;
}

export interface ScrapperLink {
  id?: string;
  class?: string;
  text?: string;
  href?: string;
}
