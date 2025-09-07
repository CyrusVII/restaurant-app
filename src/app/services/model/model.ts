//header model interface
export interface HeaderData {
  logo: string;
  subtitle: string;
  backGroundImg: string[];
}

//nav model interfaces
export interface NavbarLink {
  label: string;
  link: string;
}

//lang model interface
export interface LangOption {
  code: string;
  name: string;
}

//footer model interfaces
export interface SocialLink {
  label: string;
  url: string;
}
export interface FooterSection {
  title: string;
  lines: string[];
  links?: SocialLink[];
}
export interface FooterData {
  contatti: FooterSection;
  orari: FooterSection;
  social: FooterSection;
  copyright: string;
}

//section home interface
export interface HomeData {
  id?: string;
  title: string;
  paragraphs: string[];
  image: {
    src: string;
    alt: string;
    overlayTitle: string;
    overlayText: string;
  };
}

//section menu
export interface Piatto {
  nome: string;
  descrizione: string;
  prezzo: number;
  immagine: string;
  showImage?: boolean;
}

export interface CategoriaMenu {
  categoria: string;
  piatti: Piatto[];
}

export interface MenuData {
  menu: CategoriaMenu[];
}

//section info
export interface InfoData {
  testo: {
    titolo: string;
    descrizione: string;
  };
  indirizzo: string;
  telefono: string;
  email: string;
  whatsApp?: string;
  orari: {
    [key: string]: string;
  };
  social: {
    [key: string]: string;
  };
  mappa: {
    embedUrl: string;
  };
}
