//nav model interfaces
export interface NavbarLink {
  label: string;
  link: string;
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
export interface HomeData{
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