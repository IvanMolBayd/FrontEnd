import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Produit, Review, } from '../models/produit';
import { ProduitService } from '../produit-service';
@Component({
  selector: 'app-list-produit',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-produit.html',
  styleUrls: ['./list-produit.css'],
})

export class ListProduit implements OnInit {
  private produitService = inject(ProduitService);
  produitList : Produit[] = [];
  ngOnInit(): void {
    this.loadProduits();
  }


  loadProduits() {
    this.produitService.getProduits().subscribe({
      next: (response) => {
        this.produitList = response.products;
        console.log('Produits chargés avec succès:', this.produitList);
      },
      error: (error) => {
        console.error('Erreur lors du chargement des produits:', error);
      }
    });
  }
}

// export class ListProduit {
//   produits: Produit[] = [
//     {
//       id: 1,
//       title: 'iPhone 14',
//       price: 10200,
//       description: '128 Go, Noir',
//       images: [
//         'https://uno.ma/pub/media/catalog/product/cache/af8d7fd2c4634f9c922fba76a4a30c04/l/d/ld0005977239_1_3.jpeg'
//       ],
//       category: 'Phones',
//       stock: 10,
//       brand: 'Apple',
//       rating: 4.8,
//       availabilityStatus: true,
//       reviews: [
//         {
//           rating: 5,
//           comment: 'Excellent téléphone, très rapide !',
//           date: new Date('2024-03-10'),
//           reviewerName: 'Yassine',
//           reviewerEmail: 'yassine@example.com'
//         },
//         {
//           rating: 4,
//           comment: 'Très bon mais un peu cher.',
//           date: new Date('2024-05-21'),
//           reviewerName: 'Sara',
//           reviewerEmail: 'sara@example.com'
//         }
//       ]
//     },

//     {
//       id: 2,
//       title: 'Samsung S23',
//       price: 8700,
//       description: '256 Go',
//       images: [
//         'https://cdn.lesnumeriques.com/optim/product/71/71213/92553e9f-galaxy-s23_png__1200_1200__overflow.jpg'
//       ],
//       category: 'Phones',
//       stock: 8,
//       brand: 'Samsung',
//       rating: 4.6,
//       availabilityStatus: true,
//       reviews: [
//         {
//           rating: 5,
//           comment: 'Performance incroyable et super écran.',
//           date: new Date('2024-01-15'),
//           reviewerName: 'Imane',
//           reviewerEmail: 'imane@example.com'
//         }
//       ]
//     },

//     {
//       id: 3,
//       title: 'Asus TUF Gaming',
//       price: 13000,
//       description: 'Ryzen 7, RTX3060',
//       images: [
//         'https://m.media-amazon.com/images/I/81MjmPuOr2L._AC_SL1500_.jpg'
//       ],
//       category: 'Laptops',
//       stock: 5,
//       brand: 'Asus',
//       rating: 4.7,
//       availabilityStatus: true,
//       reviews: [
//         {
//           rating: 4,
//           comment: 'Très bon PC gaming avec un bon refroidissement.',
//           date: new Date('2024-04-02'),
//           reviewerName: 'Zakaria',
//           reviewerEmail: 'zakaria@example.com'
//         }
//       ]
//     },

//     {
//       id: 4,
//       title: 'Casque Sony WH-1000XM4',
//       price: 2800,
//       description: 'Bluetooth, Noise Cancelling',
//       images: [
//         'https://www.sony.com/image/5d02da5df552836db894cead8a68f5f3?fmt=pjpeg&wid=330&bgcolor=FFFFFF&bgc=FFFFFF'
//       ],
//       category: 'Audio',
//       stock: 12,
//       brand: 'Sony',
//       rating: 4.9,
//       availabilityStatus: true,
//       reviews: [
//         {
//           rating: 5,
//           comment: 'Le meilleur casque ANC que j’ai utilisé.',
//           date: new Date('2024-02-18'),
//           reviewerName: 'Hamza',
//           reviewerEmail: 'hamza@example.com'
//         }
//       ]
//     }
//   ];

// }
