import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { ProductService } from '../services/product.service';
import { Product } from '../models/product';

@Component({
  selector: 'app-recommend-product',
  templateUrl: './recommend-product.component.html',
  styleUrls: ['./recommend-product.component.css']
})
export class RecommendProductComponent implements OnInit {

  formularioRecomendacionProducto: FormGroup;
  productList:Product[];

  constructor(public productService:ProductService) { }

  ngOnInit(): void {
    this.getValues();
  }

  getValues(){
    this.productService.getProducts()
    .snapshotChanges()//Escucha la BD
    .subscribe(item=>{
      this.productList=[];
      item.forEach(element=>{
        let x = element.payload.toJSON();//Convertir a JSON
        x["$key"]=element.key;
        this.productList.push(x as Product);
        this.productList.sort((a,b)=>a.name.toString().localeCompare(b.name.toString()));//Ordena por cada vez que pushea un valor
      });
    });
  }
  
  prueba(){
    console.log(this.productList.length);
  }
}
