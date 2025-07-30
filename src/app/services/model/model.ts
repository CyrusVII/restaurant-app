//nav and footer model interfaces
export interface NavbarLink {
  label: string;
  link: string;
}

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