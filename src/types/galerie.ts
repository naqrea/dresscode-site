export interface GaleriePhoto {
  src: string;
  alt: string;
}

export interface PhotoShooting {
  id: string;
  nom: string;
  date?: string;
  description?: string;
  photos: GaleriePhoto[];
}
