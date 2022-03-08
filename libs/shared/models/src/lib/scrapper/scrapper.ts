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
  tables?: ScrapperTable[];
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

export interface ScrapperTable {
  head?: ScrapperTr[];
  body?: ScrapperTr[];
}

export interface ScrapperTr {
  tr?: ScrapperTd[] | ScrapperTh[];
}

export interface ScrapperTd {
  td: string | number | boolean;
}

export interface ScrapperTh {
  th: string | number | boolean;
}
