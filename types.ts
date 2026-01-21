
export enum AppTab {
  HOME = 'home',
  CREATIONS = 'creations',
  PROCESS = 'process',
  FAQ = 'faq'
}

export interface StyleCard {
  id: string;
  name: string;
  imageUrl: string;
  description?: string;
  characteristics?: string[];
  idealFor?: string;
}

export interface ProcessStep {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface ProductMeasurements {
  length: number;
  width: number;
  bust?: number;
  waist?: number;
  hips?: number;
  sleeve?: number;
}

export type FabricType = 'Soie' | 'Dentelle' | 'Satin' | 'Tulle' | 'Mousseline' | 'Crêpe' | 'Autre';

export interface ProductColor {
  hex: string;
  name: string;
}

export type ProductStatus = 'pending' | 'fitting' | 'completed';
export type ProductCategory = 'Robe' | 'Accessoire' | 'Tenue';

export interface Product {
  id: string;
  name: string;
  measurements: ProductMeasurements;
  fabric: FabricType;
  color: ProductColor;
  category: ProductCategory;
  imageUrl?: string;
  notes?: string;
  email?: string;
  phone?: string;
  status: ProductStatus;
  createdAt: number;
}
