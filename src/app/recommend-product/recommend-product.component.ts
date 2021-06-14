import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { ProductService } from '../services/product.service';
import { Product } from '../models/product';

import { RecommendService } from '../services/recommend.service';
import { Recommend } from '../models/recommend';

@Component({
  selector: 'app-recommend-product',
  templateUrl: './recommend-product.component.html',
  styleUrls: ['./recommend-product.component.css']
})
export class RecommendProductComponent implements OnInit {

  formularioRecomendacionProducto: FormGroup;
  productList:Product[];

  constructor(public productService: ProductService, public recommendService: RecommendService) { }

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
  

  onSubmit(){
    let recommend = {
      category: this.formularioRecomendacionProducto.value.productName,
      portion: this.formularioRecomendacionProducto.value.recommendedPortion,
      ageMin: this.formularioRecomendacionProducto.value.lowRankAge,
      ageMax: this.formularioRecomendacionProducto.value.topRankAge,
      weightMin: this.formularioRecomendacionProducto.value.lowRankWeight,
      weightMax: this.formularioRecomendacionProducto.value.topRankWeight,
      heightMin: this.formularioRecomendacionProducto.value.lowRankHeight,
      heightMax: this.formularioRecomendacionProducto.value.topRankHeight
    }

    this.recommendService.insertRecommend(recommend as Recommend);
  }
}
