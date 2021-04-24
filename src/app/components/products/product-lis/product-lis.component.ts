import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';

//service
import {ProductService} from '../../../services/product.service';

//class product
import {Product} from '../../../models/product';
import { element } from 'protractor';
@Component({
  selector: 'app-product-lis',
  templateUrl: './product-lis.component.html',
  styleUrls: ['./product-lis.component.css']
})
export class ProductLisComponent implements OnInit {
  productList:Product[];
    constructor(private productService: ProductService) {
      
    }


  ngOnInit() {
    this.productService.getProducts()
    .snapshotChanges()
    .subscribe(item=>{
      this.productList=[];
      item.forEach(element=>{
        let x = element.payload.toJSON();
        x["$key"]=element.key;
        this.productList.push(x as Product);
        
      });
    });
  }
  onEdit(product: Product){
   this.productService.selectedProduct=Object.assign({},product); 
  }

  onDelete($key: string){
    this.productService.deleteProduct($key);
  }
}
