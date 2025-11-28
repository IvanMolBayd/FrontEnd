export interface Review {
    rating: number;
    comment: string;
    date: Date;
    reviewerName: string;
    reviewerEmail: string;
}

export interface Produit {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    rating?: number;
    stock: number;
    brand: string;
    availabilityStatus?: boolean;
    reviews?: Review[]; 
    images: string[];
}
