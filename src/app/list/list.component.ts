import { Component, OnInit } from '@angular/core';

//Servicio
import { ProductService } from '../services/product.service';

//Modelo de datos
import { Product } from '../models/product';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  productList:Product[];
  hoverList=[false, false, false, false, false];
  prevHover:number;
  copia:Product[];

  constructor(private productService:ProductService) { }

  ngOnInit() {
    this.getValues();
    this.prevHover=-1;
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
      });
    });
  }

  changeHover(index){
    this.hoverList[this.prevHover]=!this.hoverList[this.prevHover];
    this.hoverList[index]=!this.hoverList[index];
    this.prevHover = index;
  }

  categorySearch(category){
    this.productService.getProducts()
    .snapshotChanges()//Escucha la BD
    .subscribe(item=>{
      this.productList=[];
      item.forEach(element=>{
        let x = element.payload.toJSON();//Convertir a JSON
        x["$key"]=element.key;
        if(x["category"]==category){
          this.productList.push(x as Product);
          this.productList.sort((a,b)=>a.name.toString().localeCompare(b.name.toString()));//Ordena por cada vez que pushea un valor
        }        
      });
    });

  }


}
