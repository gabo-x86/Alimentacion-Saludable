import { Component, OnInit } from '@angular/core';

import {FormBuilder, FormControl, FormGroup, Validators, ValidationErrors, ValidatorFn, AbstractControl} from '@angular/forms';

import { ProductService } from '../services/product.service';
import { Product } from '../models/product';
import { Router } from '@angular/router';

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
  recommendList: Recommend[];

  currentData;
  currentDataList: Recommend[];

  ageMin: Number;
  ageMax: Number;
  weightMin: Number;
  weightMax: Number;
  heightMin: Number;
  heightMax: Number;

  alphaFactor;

  constructor(public formBuilder: FormBuilder, public productService: ProductService, public recommendService: RecommendService, private router: Router) { 
    this.currentData={
      name: "",
      category: "",
      description: "",
      energy: 0,
      carbohydrates: 0,
      protein: 0,
      grease: 0,
      cholesterol: 0,
      sodium: 0,
      fiber: 0,
      calcium: 0,
      vitaminA: 0,
      vitaminB9: 0,
      vitaminB1: 0,
      vitaminB12: 0,
      vitaminB2: 0,
      vitaminC: 0,
      vitaminB3: 0,
      vitaminD: 0,
      vitaminB5: 0,
      vitaminE: 0,
      vitaminB6: 0,
      vitaminK: 0,
      vitaminB7: 0,
      image: ""
    };
    
  }
  

  ngOnInit(){
    this.createformularioRecomendacionProducto();
    this.getValues();
    this.getValuesRecommend();
  }

  getValues(){
    this.productService.getProducts()
    .snapshotChanges()//Escucha la BD
    .subscribe(item=>{
      this.productList=[];
      item.forEach(element=>{
        let x = element.payload.toJSON();//Convertir a JSON
        x["key"]=element.key;
        this.productList.push(x as Product);
        this.productList.sort((a,b)=>a.name.toString().localeCompare(b.name.toString()));//Ordena por cada vez que pushea un valor
      });
    });
  }
  getValuesRecommend(){
    this.recommendService.getRecommend()
    .snapshotChanges()//Escucha la BD
    .subscribe(item=>{
      this.recommendList=[];      
      item.forEach(element=>{
        let x = element.payload.toJSON();//Convertir a JSON
        x["key"]=element.key;
        this.recommendList.push(x as Recommend);
        //this.recommendList.sort((a,b)=>a.name.toString().localeCompare(b.name.toString()));//Ordena por cada vez que pushea un valor
      });
    });
  }
  

  onSubmit(){
    //console.log("LOG: >>>>> "+this.ageMin);
    const Swal = require('sweetalert2');
    let recommend = {
      category: this.currentData.name.toString(),
      portion: this.formularioRecomendacionProducto.value.recommendedPortion,
      ageMin: this.formularioRecomendacionProducto.value.lowRankAge,
      ageMax: this.formularioRecomendacionProducto.value.topRankAge,
      weightMin: this.formularioRecomendacionProducto.value.lowRankWeight,
      weightMax: this.formularioRecomendacionProducto.value.topRankWeight,
      heightMin: this.formularioRecomendacionProducto.value.lowRankHeight,
      heightMax: this.formularioRecomendacionProducto.value.topRankHeight
    }
    

    if(this.ageMin!=null && this.ageMax!=null && this.weightMin!=null && 
      this.weightMax!=null && this.heightMin!=null && this.heightMax!=null){

      if(!this.isInvalid('productName') && !this.isInvalid('recommendedPortion') && 
      !this.isInvalid('lowRankAge') && !this.isInvalid('topRankAge') && 
      !this.isInvalid('lowRankWeight') && !this.isInvalid('topRankWeight') && 
      !this.isInvalid('lowRankHeight') && !this.isInvalid('topRankHeight') && 
      !this.isOlder(this.ageMin.toString(),this.ageMax.toString()) && 
      !this.isOlder(this.weightMin.toString(),this.weightMax.toString()) && 
      !this.isOlder(this.heightMin.toString(),this.heightMax.toString())){
        
        if(recommend.category=='' || recommend.portion=='' || recommend.weightMin=='' || recommend.weightMax=='' || recommend.heightMin=='' || recommend.heightMax==''){
          Swal.fire({//FALTA AGREGARLO EN LOS CRITERIOS DE ACEPTACIÓN!!!!!!!!!!!!!!!!!!!
            position: 'top-center',
            type: 'success',
            title: 'Llene todos los campos obligatorios (*)',
            showConfirmButton:false,
            timer: 2000
          })
        }else this.recommendExist(recommend as Recommend);

      }else{
        // Swal.fire({//FALTA AGREGARLO EN LOS CRITERIOS DE ACEPTACIÓN!!!!!!!!!!!!!!!!!!!
        //   position: 'top-center',
        //   type: 'success',
        //   title: 'Llene todos los campos obligatorios (*)',
        //   showConfirmButton:false,
        //   timer: 2000
        // })
      }
    }else{
      Swal.fire({//FALTA AGREGARLO EN LOS CRITERIOS DE ACEPTACIÓN!!!!!!!!!!!!!!!!!!!
        position: 'top-center',
        type: 'success',
        title: 'Llene todos los campos obligatorios (*)',
        showConfirmButton:false,
        timer: 2000
      })
    }
      //this.recommendService.insertRecommend(recommend as Recommend);
  }

  recommendExist(recommend: Recommend){
    const Swal = require('sweetalert2');
    let recommendExistAgeMin=false;
    let recommendExistAgeMax=false;
    let lockAgeMin=false;
    let lockAgeMax=false;
    this.recommendService.getRecommend()
    .snapshotChanges()
    .subscribe(item=>{
      item.forEach(element=>{
        let x = element.payload.toJSON();//Convertir a JSON
        x["key"]=element.key;

        if(recommend.ageMin>=x["ageMin"] && recommend.ageMin<=x["ageMax"] && recommend.category==x["category"]){
          recommendExistAgeMin=true;
        }
        if(recommend.ageMax>=x["ageMin"] && recommend.ageMax<=x["ageMax"] && recommend.category==x["category"]){
          recommendExistAgeMax=true;
        }
        
      });

      if(!recommendExistAgeMin && !lockAgeMin && !recommendExistAgeMax && !lockAgeMax){
        // Swal.fire({
        //   position: 'top-center',
        //   type: 'success',
        //   title: '',
        //   showConfirmButton:false,
        //   timer: 2000
        // })
        this.recommendService.insertRecommend(recommend as Recommend);//Insetar registro en la BD
        lockAgeMin=true;
        lockAgeMax=true;
        this.router.navigate(['/']);

      }else if(recommendExistAgeMin && !lockAgeMin){
        Swal.fire({
          position: 'top-center',
          type: 'success',
          title: 'Rango inferior de edad ya registrado',
          showConfirmButton:false,
          timer: 2000
        })

      }else if(recommendExistAgeMax && !lockAgeMax){
        Swal.fire({
          position: 'top-center',
          type: 'success',
          title: 'Rango superior de edad ya registrado',
          showConfirmButton:false,
          timer: 2000
        })
      }else if(recommendExistAgeMin && recommendExistAgeMax){
        Swal.fire({
          position: 'top-center',
          type: 'success',
          title: 'Recomendación registrada',
          showConfirmButton:false,
          timer: 2000
        })
      }
    });

  }



  public isInvalid(formControlName: string): boolean {
    let control = this.formularioRecomendacionProducto.controls[formControlName];
    return !control.valid && (control.dirty || control.touched);
  }
  
  public hasErrorControl(formControlName, errorType) {
    return this.formularioRecomendacionProducto.controls[formControlName].errors[errorType];
  }

  private createformularioRecomendacionProducto() {
    this.formularioRecomendacionProducto = this.formBuilder.group({
      productName: ['', [Validators.required]],
      recommendedPortion: ['', [ Validators.required, Validators.max(1000000), Validators.min(100)]],
      lowRankAge: ['', [ Validators.required, Validators.max(91), Validators.min(0)]],
      topRankAge: ['', [ Validators.required, Validators.max(91), Validators.min(0)]],
      lowRankWeight: ['', [ Validators.required, Validators.max(120), Validators.min(1)]],
      topRankWeight: ['', [ Validators.required, Validators.max(120), Validators.min(1)]],
      lowRankHeight: ['', [ Validators.required, Validators.max(250), Validators.min(50)]],
      topRankHeight: ['', [ Validators.required, Validators.max(250), Validators.min(50)]],
    })
  }
  
  isOlder(minValue:string, maxValue:string){
    if(parseInt(minValue,10) > parseInt(maxValue,10)){
      return true;
    }else{
      return false;
    }
  }


  numericOnly(event): boolean { // restrict e,+,-,E characters in  input type number
    debugger
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode == 101 || charCode == 69 || charCode == 45 || charCode == 43 || charCode == 46 || charCode == 44) {
      return false;
    }
    return true;

  }

  bringRecommendedData(){    
    this.currentDataList=[];
    let len = this.recommendList.length;
    for(let i=0;i<len;i++){
      if(this.recommendList[i].category == this.currentData.name.toString()){
        this.currentDataList.push(this.recommendList[i]);
      }
    }
  }

  

}
