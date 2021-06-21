import { Component, OnInit } from '@angular/core';
import {HeaderComponent } from '../header/header.component';

import { ProductService } from '../services/product.service';
import { Product } from '../models/product';

import { RecommendService } from '../services/recommend.service';
import { Recommend } from '../models/recommend';

@Component({
  selector: 'app-usuario-component',
  templateUrl: './usuario-component.component.html',
  styleUrls: ['./usuario-component.component.css']
})
export class UsuarioComponentComponent implements OnInit {

  public productList:Product[];
  public recommendList: Recommend[];
  public totalList=[];

  public cacheUser;

  constructor(public productService: ProductService, public recommendService: RecommendService) { 
  }

  ngOnInit(): void {
    this.getValuesRecommend();
    this.getValues();
    this.cacheUser = JSON.parse( localStorage.getItem("user") );
    
    if (!localStorage.getItem('foo')) { 
      localStorage.setItem('foo', 'no reload') 
      location.reload() 
    } else {
      localStorage.removeItem('foo') 
    }
  }

  getValuesRecommend(){    
    this.recommendService.getRecommend()
    .snapshotChanges()//Escucha la BD
    .subscribe(item=>{
      this.recommendList=[];      
      item.forEach(element=>{
        let x = element.payload.toJSON();//Convertir a JSON
        x["key"]=element.key;        
        if(this.getEdad()>=x["ageMin"] && this.getEdad()<=x["ageMax"]){
          this.recommendList.push(x as Recommend);
        }
        //this.recommendList.sort((a,b)=>a.name.toString().localeCompare(b.name.toString()));//Ordena por cada vez que pushea un valor
      });
    });
  }
  getValues(){    
    this.productService.getProducts()
    .snapshotChanges()//Escucha la BD
    .subscribe(item=>{
      this.productList=[];
      item.forEach(element=>{
        let x = element.payload.toJSON();//Convertir a JSON
        x["key"]=element.key;
        if(this.recommendList!=undefined){
          for(let i=0;i<this.recommendList.length;i++){
            if(x["name"]==this.recommendList[i].category){
              this.productList.push(x as Product);
              this.productList.sort((a,b)=>a.name.toString().localeCompare(b.name.toString()));//Ordena por cada vez que pushea un valor
            }
          }
        }        
      });
    });
  }

  getEdad() {
    let hoy = new Date()
    let fechaNacimiento = new Date(this.cacheUser.bornDate.toString());
    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    let diferenciaMeses = hoy.getMonth() - fechaNacimiento.getMonth();
    if (diferenciaMeses < 0 || (diferenciaMeses === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
      edad--
    }
    return edad;
  }
  
  saveFood(product:Product, recommend:Recommend){
    localStorage.setItem("productSelected", JSON.stringify(product));
    localStorage.setItem("recommendSelected", JSON.stringify(recommend));
    localStorage.setItem("isRecommend", "true");
  }

}


