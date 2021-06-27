import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';

import { Product } from './../models/product';
import { ProductService } from './../services/product.service';

import { DomSanitizer } from '@angular/platform-browser';
import { AngularFireStorage } from '@angular/fire/storage';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  //private product: Product;
  public files: any = [];
  public prevFile: string;
  formularioRegistroProducto: FormGroup;

  public energeticValue;
  public carbohydrates;
  public protein;
  public fat;
  public cholesterol;
  public sodium;
  public fiber;
  public calcium;
  public vitaminA;
  public vitaminB9;
  public vitaminB1;
  public vitaminB12;
  public vitaminB2;
  public vitaminC;
  public vitaminB3;
  public vitaminD;
  public vitaminB5;
  public vitaminE;
  public vitaminB6;
  public vitaminK;
  public vitaminB7;

  public outLimit;
  public theresPicture;
  public isCorrectFormat;
  constructor(public formBuilder: FormBuilder, private productService: ProductService, private router: Router, private sanitizer: DomSanitizer, private storage: AngularFireStorage) { 
    this.theresPicture=false;
  }

  ngOnInit() {
    this.createFormularioRegistroProducto();    
  }

  onSubmit(){
    //console.log(Math.floor((this.prevFile.length+2) / 3) * 4);
    /*var input = document.getElementById('archivo');
    var file = input.files;
    console.log(file.size);*/

    const Swal = require('sweetalert2');
    let product={
      name: this.formularioRegistroProducto.value.productName.toUpperCase(),
      category: this.formularioRegistroProducto.value.productType,
      description: this.formularioRegistroProducto.value.description,
      energy: this.formularioRegistroProducto.value.energeticValue,
      carbohydrates: this.formularioRegistroProducto.value.carbohydrates,
      protein: this.formularioRegistroProducto.value.protein,
      grease: this.formularioRegistroProducto.value.fat,
      cholesterol: this.formularioRegistroProducto.value.cholesterol,
      sodium: this.formularioRegistroProducto.value.sodium,
      fiber: this.formularioRegistroProducto.value.fiber,
      calcium: this.formularioRegistroProducto.value.calcium,
      vitaminA: this.formularioRegistroProducto.value.vitaminA,
      vitaminB9: this.formularioRegistroProducto.value.vitaminB9,
      vitaminB1: this.formularioRegistroProducto.value.vitaminB1,
      vitaminB12: this.formularioRegistroProducto.value.vitaminB12,
      vitaminB2: this.formularioRegistroProducto.value.vitaminB2,
      vitaminC: this.formularioRegistroProducto.value.vitaminC,
      vitaminB3: this.formularioRegistroProducto.value.vitaminB3,
      vitaminD: this.formularioRegistroProducto.value.vitaminD,
      vitaminB5: this.formularioRegistroProducto.value.vitaminB5,
      vitaminE: this.formularioRegistroProducto.value.vitaminE,
      vitaminB6: this.formularioRegistroProducto.value.vitaminB6,
      vitaminK: this.formularioRegistroProducto.value.vitaminK,
      vitaminB7: this.formularioRegistroProducto.value.vitaminB7,
      image: this.prevFile
    }
    product.name=this.removeTrailingSpaces(product.name);

    
    if(this.outLimit==false && this.theresPicture!=false && this.isCorrectFormat==true){

    if(!this.isInvalid('productName') && !this.isInvalid('productType') &&  !this.isInvalid('description') 
    && !this.isInvalid('energeticValue') && !this.isInvalid('carbohydrates')  && !this.isInvalid('protein') 
    && !this.isInvalid('fat') && !this.isInvalid('cholesterol') && !this.isInvalid('sodium') 
    && !this.isInvalid('fiber') && !this.isInvalid('calcium') && !this.isInvalid('vitaminA') 
    && !this.isInvalid('vitaminB9') && !this.isInvalid('vitaminB1') && !this.isInvalid('vitaminB12') 
    && !this.isInvalid('vitaminB2') && !this.isInvalid('vitaminC') && !this.isInvalid('vitaminB3') 
    && !this.isInvalid('vitaminD') && !this.isInvalid('vitaminB5') && !this.isInvalid('vitaminE') 
    && !this.isInvalid('vitaminB6') && !this.isInvalid('vitaminK') && !this.isInvalid('vitaminB7')){
      
      if(product.cholesterol==undefined){
        product.cholesterol=0;
      }
      if(product.vitaminA==undefined){
        product.vitaminA=0;
      }
      if(product.vitaminB9==undefined){
        product.vitaminB9=0;
      }
      if(product.vitaminB1==undefined){
        product.vitaminB1=0;
      }
      if(product.vitaminB12==undefined){
        product.vitaminB12=0;
      }
      if(product.vitaminB2==undefined){
        product.vitaminB2=0;
      }
      if(product.vitaminC==undefined){
        product.vitaminC=0;
      }
      if(product.vitaminB3==undefined){
        product.vitaminB3=0;
      }
      if(product.vitaminD==undefined){
        product.vitaminD=0;
      }
      if(product.vitaminB5==undefined){
        product.vitaminB5=0;
      }
      if(product.vitaminE==undefined){
        product.vitaminE=0;
      }
      if(product.vitaminB6==undefined){
        product.vitaminB6=0;
      }
      if(product.vitaminK==undefined){
        product.vitaminK=0;
      }
      if(product.vitaminB7==undefined){
        product.vitaminB7=0;
      }

      if(product.name=='' || product.category=='' || product.energy=='' || product.carbohydrates=='' 
      || product.protein=='' || product.grease=='' || product.sodium=='' || product.fiber=='' 
      || product.calcium=='' || product.description==''){
        Swal.fire({//FALTA AGREGARLO EN LOS CRITERIOS DE ACEPTACIÓN!!!!!!!!!!!!!!!!!!!
          position: 'top-center',
          type: 'success',
          title: 'Llene todos los campos obligatorios (*)',
          showConfirmButton:false,
          timer: 2000
        })
      }else this.productExist(product as Product);

    }else{
      Swal.fire({//FALTA AGREGARLO EN LOS CRITERIOS DE ACEPTACIÓN!!!!!!!!!!!!!!!!!!!
        position: 'top-center',
        type: 'success',
        title: 'Llene todos los campos obligatorios (*)',
        showConfirmButton:false,
        timer: 2000
      })
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
  }


  productExist(product:Product){
    const Swal = require('sweetalert2');
    let productExist=false;
    let lock=false;
    this.productService.getProducts()
    .snapshotChanges()
    .subscribe(item=>{      
      item.forEach(element=>{
        let x = element.payload.toJSON();//Convertir a JSON
        x["$key"]=element.key;
        //this.userService.deleteUser(x["$key"]);
        if(x["name"]==product.name){
          productExist=true;
        }
      });

      if(!productExist && !lock){
        Swal.fire({
          position: 'top-center',
          type: 'success',
          title: '',
          showConfirmButton:false,
          timer: 2000
        })
        this.productService.insertProduct(product as Product);//Insetar registro en la BD
        //this.onUpload();//Insertar imagen en la BD
        lock=true;
        this.router.navigate(['/']);

      }else if(productExist && !lock){
        Swal.fire({
          position: 'top-center',
          type: 'success',
          title: 'Este alimento ya está registrado',
          showConfirmButton:false,
          timer: 2000
        })

      }else if(productExist){
        Swal.fire({
          position: 'top-center',
          type: 'success',
          title: 'Registro de alimento exitoso',
          showConfirmButton:false,
          timer: 2000
        })
      }
    });

  }


  public isInvalid(formControlName: string): boolean {
    let control = this.formularioRegistroProducto.controls[formControlName];
    return (!control.valid && (control.dirty || control.touched));
  }

  public hasErrorControl (formControlName, errorType) {
    return this.formularioRegistroProducto.controls[formControlName].errors[errorType];
  }
  
  private createFormularioRegistroProducto () {
    this.formularioRegistroProducto = this.formBuilder.group({
      $key: ['', []],
      productName: ['', [Validators.required, Validators.maxLength(20),
         Validators.minLength(3), Validators.pattern(/^[a-zA-Z-áÁ-éÉ-íÍ-óÓ-úÚ\s\u00f1\u00d1]+$/)]],
      productType: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.maxLength(500), Validators.minLength(150)]],
      energeticValue: ['', [Validators.required, Validators.max(3000), Validators.min(0)]],
      carbohydrates: ['', [Validators.required, Validators.max(100000), Validators.min(0)]],
      protein: ['', [Validators.required, Validators.max(100000), Validators.min(0)]],
      fat: ['', [Validators.required, Validators.max(100000), Validators.min(0)]],
      cholesterol: ['', [Validators.max(100000), Validators.min(0)]],
      sodium: ['', [Validators.required, Validators.max(100000), Validators.min(0)]],
      fiber: ['', [Validators.required, Validators.max(100000), Validators.min(0)]],
      calcium: ['', [Validators.required, Validators.max(100000), Validators.min(0)]],
      vitaminA: ['', [Validators.max(100000), Validators.min(0)]],
      vitaminB9: ['', [Validators.max(100000), Validators.min(0)]],
      vitaminB1: ['', [Validators.max(100000), Validators.min(0)]],
      vitaminB12: ['', [Validators.max(100000), Validators.min(0)]],
      vitaminB2: ['', [Validators.max(100000), Validators.min(0)]],
      vitaminB3: ['', [Validators.max(100000), Validators.min(0)]],
      vitaminB5: ['', [Validators.max(100000), Validators.min(0)]],
      vitaminC: ['', [Validators.max(100000), Validators.min(0)]],
      vitaminD: ['', [Validators.max(100000), Validators.min(0)]],
      vitaminE: ['', [Validators.max(100000), Validators.min(0)]],
      vitaminB6: ['', [Validators.max(100000), Validators.min(0)]],
      vitaminK: ['', [Validators.max(100000), Validators.min(0)]],
      vitaminB7: ['', [Validators.max(100000), Validators.min(0)]],
      image: ['', []]

    })
  }
  getFormularioRegistroProducto(){}
//event.preventDefault(); 
    //console.log(this.formularioRegistro.value);
  
    onUpload(){
      const id = this.formularioRegistroProducto.value.productName.toUpperCase();
      const file = this.files[0];
      const filePath = 'products/'+id+'.png'
      const ref = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, file);
    }

    capFile(event): any{//Mostrar vista previa
      //this.files=[]; POSIBLE SOLUCIÓN
      const file = event.target.files[0];
      this.extraerBase64(file).then((image: any)=>{
        this.prevFile = image.base;
      });
      this.files.push(file);

      
      //Control tamaño archivo
      if(file.size>500000){
        this.outLimit=true;
      }else{
        this.outLimit=false;
      }

      //Control si hay imagen
      this.theresPicture=true;

      //Control dimensiones archivo
      if(file.type=='image/png' || file.type=='image/bmp' || file.type=='image/jpeg' || file.type=='image/jpg'){
        this.isCorrectFormat=true;
      }else this.isCorrectFormat=false;
    }

    extraerBase64 = async ($event: any) => new Promise((resolve, reject) => {
      try {
        const unsafeImg = window.URL.createObjectURL($event);
        const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
        const reader = new FileReader();
        reader.readAsDataURL($event);
        reader.onload = () => {
          resolve({
            base: reader.result
          });
        };
        reader.onerror = error => {
          resolve({
            base: null
          });
        };
  
      } catch (e) {
        return null;
      }
    })


    validarDecimales(e, event) {
      const charCode = (event.which) ? event.which : event.keyCode;
      if (charCode == 101 || charCode == 69 || charCode == 45 || charCode == 43 || charCode == 44 || charCode==13) {
        return false;
      }else{
        if(e!=null){
          if((e.toString().indexOf('.')!=-1) && ((e.toString().substring(e.toString().indexOf('.')+1,e.toString().length)).length>4)){
            return false;
          }else return true;
        }
      }
    }


    validarSimbolos(event): boolean { // restrict e,+,-,E characters in  input type number
      const charCode = (event.which) ? event.which : event.keyCode;
      if (charCode == 33 || charCode == 63 || charCode == 60 || charCode == 62 ||
         charCode == 93 || charCode == 91 || charCode == 64 || charCode == 35 ||
         charCode == 36 || charCode == 37 || charCode == 94 || charCode == 38 || 
         charCode == 42 || charCode == 40 || charCode == 41 || charCode == 95 || charCode==13) {
        return false;
      }
      return true;
  
    }

    removeTrailingSpaces(str){
      while(str[str.length-1]==' '){
        str=str.substring(0,str.length-1);
      }
      return str;
    }

    charValidator(event){
      if(event.charCode == 13){
        return false;
      }else return true;
    }

}
