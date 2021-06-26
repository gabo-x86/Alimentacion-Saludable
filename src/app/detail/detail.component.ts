import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  public productSelected;
  public recommendSelected;
  public isRecommend;
  public recommendedView;

  public energy;
  public carbohydrates;
  public protein;
  public grease;
  public cholesterol;
  public sodium;
  public fiber;
  public calcium;
  public vitaminA;
  public vitaminB1;
  public vitaminB2;
  public vitaminB3;
  public vitaminB5;
  public vitaminB6;
  public vitaminB7;
  public vitaminB9;
  public vitaminB12;
  public vitaminC;
  public vitaminD;
  public vitaminE;
  public vitaminK;

  constructor(private router:Router) {
    this.getProduct();
      if(this.isRecommend=='true'){
        this.energy = (this.productSelected.energy*this.recommendSelected["portion"]/100).toFixed(5);
        this.carbohydrates = (this.productSelected.carbohydrates*this.recommendSelected["portion"]/100).toFixed(5);
        this.protein = (this.productSelected.protein*this.recommendSelected["portion"]/100).toFixed(5);
        this.grease = (this.productSelected.grease*this.recommendSelected["portion"]/100).toFixed(5);
        this.cholesterol = (this.productSelected.cholesterol*this.recommendSelected["portion"]/100).toFixed(5);
        this.sodium = (this.productSelected.sodium*this.recommendSelected["portion"]/100).toFixed(5);
        this.fiber = (this.productSelected.fiber*this.recommendSelected["portion"]/100).toFixed(5);
        this.calcium = (this.productSelected.calcium*this.recommendSelected["portion"]/100).toFixed(5);
        this.vitaminA = (this.productSelected.vitaminA*this.recommendSelected["portion"]/100).toFixed(5);
        this.vitaminB1 = (this.productSelected.vitaminB1*this.recommendSelected["portion"]/100).toFixed(5);
        this.vitaminB2 = (this.productSelected.vitaminB2*this.recommendSelected["portion"]/100).toFixed(5);
        this.vitaminB3 = (this.productSelected.vitaminB3*this.recommendSelected["portion"]/100).toFixed(5);
        this.vitaminB5 = (this.productSelected.vitaminB5*this.recommendSelected["portion"]/100).toFixed(5);
        this.vitaminB6 = (this.productSelected.vitaminB6*this.recommendSelected["portion"]/100).toFixed(5);
        this.vitaminB7 = (this.productSelected.vitaminB7*this.recommendSelected["portion"]/100).toFixed(5);
        this.vitaminB9 = (this.productSelected.vitaminB9*this.recommendSelected["portion"]/100).toFixed(5);
        this.vitaminB12 = (this.productSelected.vitaminB12*this.recommendSelected["portion"]/100).toFixed(5);
        this.vitaminC = (this.productSelected.vitaminC*this.recommendSelected["portion"]/100).toFixed(5);
        this.vitaminD = (this.productSelected.vitaminD*this.recommendSelected["portion"]/100).toFixed(5);
        this.vitaminE = (this.productSelected.vitaminE*this.recommendSelected["portion"]/100).toFixed(5);
        this.vitaminK = (this.productSelected.vitaminK*this.recommendSelected["portion"]/100).toFixed(5);

        console.log("DEBUGGGGGGGG>>>><"+this.vitaminB5);
      }
      
  }

  ngOnInit(): void {
    this.getProduct();
    // if(localStorage.getItem('recommendSelected')=="undefined" || localStorage.getItem('recommendSelected')==null || localStorage.getItem('recommendSelected')==undefined){
    //   this.recommend=false;
    // }else{
    //   this.recommend=true;
    // }
  }

  getProduct(){
    this.productSelected = JSON.parse( localStorage.getItem("productSelected"));
    this.recommendSelected = JSON.parse( localStorage.getItem("recommendSelected"));
    this.isRecommend = localStorage.getItem("isRecommend").toString();
    this.recommendedView = localStorage.getItem('recommendedView').toString();
  }

  showValues(){
    console.log(this.productSelected.energy);
  }



}
