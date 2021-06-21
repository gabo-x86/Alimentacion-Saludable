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

  constructor(private router:Router) {
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
  }



}
