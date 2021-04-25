import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
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
  buscar: string;//ri

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
  consulProductos(){
    this.productService.getProducts()
    .snapshotChanges()//Escucha la BD
    .subscribe(item=>{
      this.productList=[];
      item.forEach(element=>{
        let x = element.payload.toJSON();//Convertir a JSON
        x["$key"]=element.key;
        this.productList.push(x as Product);
      });
      const Swal = require('sweetalert2')
  this.productList=this.productList.filter(data=>{
    return data.$key.toString().trim()==this.buscar;
  })
  if(this.productList.length==0){
    this.getValues();
    Swal.fire({
      position: 'top-end',
      type: 'success',
      title: 'No se ha encontrado ese alimento',
      showConfirmButton:false,
      timer: 1500
  
    })
  }else{
    
    Swal.fire({
      position: 'top-end',
      type:'success',
      title: 'Alimento encontrado!',
      showConfirmButton: false,
      timer: 1500

    })
    }
    })};

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
        }        
      });
    });
  }

}
