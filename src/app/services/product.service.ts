import { Injectable } from '@angular/core';
import { from } from 'rxjs';

import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productList: AngularFireList<any>;
  selectedProduct: Product = new Product();
  constructor(private firebase: AngularFireDatabase) {
   }
    getProducts(){
      return this.productList = this.firebase.list('products')
    } 
    insertProduct(product: Product){
      this.productList.push({
        name: product.name,
        category: product.category,
        description: product.description,
        energy: product.energy,
        carbohydrates: product.carbohydrates,
        protein: product.protein,
        grease: product.grease,
        cholesterol: product.cholesterol,
        sodium: product.sodium,
        fiber: product.fiber,
        calcium: product.calcium,
        vitaminA: product.vitaminA,
        vitaminB1: product.vitaminB1,
        vitaminB2: product.vitaminB2,
        vitaminB3: product.vitaminB3,
        vitaminB5: product.vitaminB5,
        vitaminC: product.vitaminC,
        vitaminD: product.vitaminD,
        vitaminE: product.vitaminE,
        vitaminK: product.vitaminK,
        image: product.image
      });
    }
    
    UpdateProduct(product: Product){
        this.productList.update(product.$key,{
          name: product.name,
          category: product.category,
          description: product.description,
          //Image: product.imagen
        });
    }
    deleteProduct($key: string){
      this.productList.remove($key);
    }
}
