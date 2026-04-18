export interface Product {
  id: string;
  name: string;
  description: string;
  short_description: string;
  price: number;
  image_url: string;
  category: string;
  notes: string;
  size_ml: number;
  in_stock: boolean;
  featured: boolean;
  created_at: string;
}

export type Page = 'home' | 'shop';
