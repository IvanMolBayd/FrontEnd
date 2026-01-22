export interface Commande {
    id?: string;
    userId: string;
    items: any[]; // On stockera une copie des items du panier
    total: number;
    date: any;
    status: 'confirmée' | 'expédiée' | 'livrée';
}
