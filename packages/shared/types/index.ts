export interface IProduct {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface IProductResponse {
  products: IProduct[];
  count: number;
}

export interface IProductRequest {
  page: number;
}