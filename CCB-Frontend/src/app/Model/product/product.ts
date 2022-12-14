export interface product {
  product_id?: number;
  product_name: string;
  product_thumbnail: string;
  product_quantity: number;
  product_description: string;
  tags: string;
  price: number;
  lat: number;
  lan: number;
  city: string;
  neighborhood: string;
  seller_id: number;
  qty: number;
  created_at?: string;
  category_id: number;
}
