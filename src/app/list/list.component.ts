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
  buscar: string;
  success:boolean

  constructor(private productService:ProductService) { }

  ngOnInit() {
    this.getValues();
    this.prevHover=-1;
    this.success=false;
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
  consulProductos(searchValue){
    let itsFind:Boolean;
    itsFind=false;
    this.productService.getProducts()
    .snapshotChanges()//Escucha la BD
    .subscribe(item=>{
      this.productList=[];
      item.forEach(element=>{
        let x = element.payload.toJSON();//Convertir a JSON
        x["$key"]=element.key;        
        if(x["name"]==searchValue.value.toString().toUpperCase()){
          this.productList.push(x as Product);
          itsFind=true;          
        }
      });

      const Swal = require('sweetalert2');
      if(this.productList.length==0 || !itsFind){
        this.getValues();
        Swal.fire({
          position: 'top-center',
          type: 'success',
          title: 'No se ha encontrado ese alimento',
          showConfirmButton:false,
          timer: 2000
      
        })
        this.success=false;
      }else{
          Swal.fire({
          position: 'top-center',
          type:'success',
          title: '¡Alimento encontrado!',
          showConfirmButton: false,
          timer: 2000
          })
          this.success=true;
      }
      this.changeHover(-1);

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
          this.productList.sort((a,b)=>a.name.toString().localeCompare(b.name.toString()));//Ordena por cada vez que pushea un valor
        }        
      });
    });

  }
  saveFood(product:Product){
    localStorage.setItem("productSelected", JSON.stringify(product));
  }

  charValidator(event){
    return ((event.charCode >= 65 && event.charCode <= 90) || (event.charCode >= 97 && event.charCode <= 122) || event.charCode == 209 || 
            event.charCode == 241 || event.charCode==193 || event.charCode==225 || event.charCode==201 ||
            event.charCode==233 || event.charCode==205 || event.charCode==237 || event.charCode==211 ||
            event.charCode==243 || event.charCode==218 || event.charCode==250)
  }

  searchSuccess(){
    if(this.success){
      return "80vh"
    }else return "max-content"
  }


}
