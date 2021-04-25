import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  productSelected;
  constructor(private router:Router) {
  }

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct(){
    this.productSelected = JSON.parse( localStorage.getItem("productSelected") );
    console.log(this.productSelected);
  }



}
