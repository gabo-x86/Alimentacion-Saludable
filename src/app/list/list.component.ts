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

  constructor(private productService:ProductService) { }

  ngOnInit() {
    this.productService.getProducts()//Escucha la BD
    .snapshotChanges()
    .subscribe(item=>{
      this.productList=[];
      item.forEach(element=>{
        let x = element.payload.toJSON();//Convertir a JSON
        x["$key"]=element.key;
        this.productList.push(x as Product);
        
      });
    });
  }

}
