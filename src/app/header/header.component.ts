import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';
import { listChanges } from '@angular/fire/database';
import { FORMERR } from 'node:dns';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() input:boolean;
  public user;
  public cacheUser;
  public productList:Product[];
  public recommendedView;
  constructor(private productService:ProductService) {    
  }

  ngOnInit(): void {
    this.getValues();
    this.getRecommendView();
    /* this.user=JSON.parse(localStorage.getItem('user')); */
    if(localStorage.getItem('user')=="undefined" || localStorage.getItem('user')==null){
      this.user=false;
    }else{
      this.user=true;
      this.cacheUser=JSON.parse(localStorage.getItem('user'));
    } 
    //console.log("DEBUG: "+localStorage.getItem('user'));
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
  

  refresh(){
    if(this.input){
      window.location.reload();
    }    
  }

  onLogOut(){
    //this.auth.auth.signOut();
    localStorage.setItem("user", undefined);
    if(this.input==true || this.input==null || this.input==undefined){
      window.location.reload();
    }
  }

  getRecommendView(){
    this.recommendedView = localStorage.getItem("recommendedView").toString();
  }


  /*------------- */

  bestValue(){
    console.log(this.productList[0].name);
    let matrix = [];
    matrix=this.createMatrix();
    matrix=this.matrixFormat(matrix);
    matrix=this.loadData(matrix, this.suggestValues());
    matrix=this.amendFO(matrix);//Corregir FO
    matrix=this.simplex(matrix);

    console.log(matrix);




  }
  createMatrix(){
    let res=[];
    for(let i=0; i<7; i++) {
      res[i] = [];
      for(let j=0; j<this.productList.length+10+3; j++) {
          res[i][j] = 0;
      }
    }
    return res;
  }
  matrixFormat(matrix){
    //Col
    for(let i=1;i<=this.productList.length;i++){
      matrix[0][i+1]="x"+i;
    }
    for(let i=1;i<=5;i++){
      matrix[0][this.productList.length+i+1]="a"+i;
      matrix[0][this.productList.length+5+i+1]="s"+i;
    }
    matrix[0][1]="Z";
    matrix[0][matrix[0].length-1]="LD";

    //Rows
    for(let i=2;i<matrix.length;i++){
      matrix[i][0]="a"+(i-1);
    }
    matrix[1][0]="Z";
    return matrix;
  }

  loadData(matrix,ld){
    matrix[1][1]=-1;
    for(let i=1; i<=5; i++) {
      matrix[1][this.productList.length+1+i]=1;
    }
    for(let i=0;i<this.productList.length;i++){
      matrix[2][i+2]=this.productList[i].energy;
    }
    for(let i=0;i<this.productList.length;i++){
      matrix[3][i+2]=this.productList[i].protein;
    }
    for(let i=0;i<this.productList.length;i++){
      matrix[4][i+2]=this.productList[i].calcium;
    }
    for(let i=0;i<this.productList.length;i++){
      matrix[5][i+2]=this.productList[i].vitaminA;
    }
    for(let i=0;i<this.productList.length;i++){
      matrix[6][i+2]=this.productList[i].vitaminC;
    }

    for(let i=2;i<=6;i++){//1's & -1's a/s
      matrix[i][this.productList.length+i]=1;
      matrix[i][this.productList.length+i+5]=-1;
    }

    for(let i=0;i<5;i++){//load LD
      matrix[i+2][this.productList.length+10+3-1]=ld[i];
    }

    return matrix;
  }

  amendFO(matrix){
    for(let i=2;i<this.productList.length+10+3;i++){
      matrix[1][i] = matrix[1][i] + (matrix[2][i]*(-1)) + (matrix[3][i]*(-1)) + (matrix[4][i]*(-1)) + (matrix[5][i]*(-1)) + (matrix[6][i]*(-1))
    }    
    return matrix
  }

  suggestValues(){
    let weight = this.cacheUser.weight;
    let age = this.getEdad();
    let gender = this.cacheUser.gender;
    let res = [];
    if(age<=0){
      res[0]=710;//Energy
      res[1]=19600;//Protein
      res[2]=400;//Calcium
      res[3]=0.4;//Vitamin A
      res[4]=30;//Vitamin C
    }else if(age>=1 && age<=3){
      res[0]=1025;
      res[1]=19300;
      res[2]=500;
      res[3]=0.4;
      res[4]=30;
    }else if(age>=4 && age<=6){
      res[0]=1350;
      res[1]=27300;
      res[2]=600;
      res[3]=0.45;
      res[4]=30;
    }else if(age>=7 && age<=9){
      res[0]=1700;
      res[1]=36700;
      res[2]=700;
      res[3]=0.5;
      res[4]=35;
    }else if(age>=10 && age<=18 && gender=="Mujer"){
      res[0]=2000;
      res[1]=56000;
      res[2]=1300;
      res[3]=0.6;
      res[4]=40;
    }else if(age>=10 && age<=18 && gender=="Hombre"){
      res[0]=2400;
      res[1]=57500;
      res[2]=1300;
      res[3]=0.6;
      res[4]=40;
    }else if(age>=19 && age<=65 && gender=="Mujer"){
      res[0]=2050;
      res[1]=55000;
      res[2]=1000;
      res[3]=0.5;
      res[4]=45;
    }else if(age>=65 && gender=="Mujer"){
      res[0]=1850;
      res[1]=55000;
      res[2]=1300;
      res[3]=0.6;
      res[4]=45;
    }else if(age>=19 && age<=65 && gender=="Hombre"){
      res[0]=2600;
      res[1]=65000;
      res[2]=1000;
      res[3]=0.6;
      res[4]=45;
    }else if(age>=65 && gender=="Hombre"){
      res[0]=2150;
      res[1]=65000;
      res[2]=1300;
      res[3]=0.6;
      res[4]=45;
    }
    return res;
  }

  simplex(matrix){
    let flag=false;
while(!flag){
    let smallNumCol=9999999;
    let smallIndexCol=9999999;

    let smallNumRow=9999999;//!
    let smallIndexRow=9999999;//!    


    for(let i=2;i<=this.productList.length+10+3-2;i++){//verificamos el valor más negativo11
      if(matrix[1][i]<smallNumCol && matrix[1][i]<0){
        smallNumCol=matrix[1][i];
        smallIndexCol=i;
      }
    }
    if(smallNumCol==9999999 ||smallIndexCol==9999999){
      flag=true;
    }
    
    if(smallNumCol!=9999999 && smallIndexCol!=9999999){//verificamos columna pivote
      for(let i=2;i<7;i++){        
        if((matrix[i][matrix[0].length-1]/matrix[i][smallIndexCol])<smallNumRow && (matrix[i][matrix[0].length-1]/matrix[i][smallIndexCol])>0){
          smallNumRow=matrix[i][matrix[0].length-1]/matrix[i][smallIndexCol];
          smallIndexRow=i;
        }
      }
      console.log("PIVOTE: "+smallIndexCol+", "+smallIndexRow);
      
      for(let i=2;i<this.productList.length+10+3;i++){//Volver 1 el PIVOTE
        matrix[smallIndexRow][i]=matrix[smallIndexRow][i]/matrix[smallIndexRow][smallIndexCol];
      }

      for(let i=2;i<this.productList.length+10+3;i++){//cols - Volver 0 columna pivote
        for(let j=1;j<7;j++){//rows
          if(j==smallIndexRow){
            continue;
          }else{
              matrix[j][i]=matrix[j][i]-(matrix[smallIndexRow][i]*matrix[j][smallIndexCol]);
          }
        }
      }
      matrix[smallIndexRow][0]=matrix[0][smallIndexCol];//regla de salida
    }else console.log("Solución encontrada");

}
    for(let i=2;i<7;i++){
      console.log(matrix[i][0]+" = "+matrix[i][this.productList.length+10+2]);
    }
    return matrix;
  }

  simplex2(matrix){
    for(let i=2;i<=this.productList.length+1;i++){
      matrix[1][i]=1;
    }

    let basicVar=[];
    let basicVarColIndex=[];
    for(let i=2;i<7;i++){
      basicVar.push(matrix[i][0]);
    }
    for(let j=0;j<basicVar.length;j++){
      for(let k=0;k<this.productList.length+10+3;k++){
        if(basicVar[j]==matrix[0][k]){
          basicVarColIndex.push(k);
          //basicVar[j]=matrix[0][k];
          break;
        }
      }
    }

    return matrix;

  }

  getEdad() {
    let hoy = new Date()
    let fechaNacimiento = new Date(this.cacheUser.bornDate)
    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear()
    let diferenciaMeses = hoy.getMonth() - fechaNacimiento.getMonth()
    if (
      diferenciaMeses < 0 ||
      (diferenciaMeses === 0 && hoy.getDate() < fechaNacimiento.getDate())
    ) {
      edad--
    }
    return edad
  }

}
