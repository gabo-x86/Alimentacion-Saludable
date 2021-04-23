import { importType } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { from } from 'rxjs';


//service
import {ProductService} from '../../../services/product.service';

//product class
import {Product} from '../../../models/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(public productService: ProductService) {
    
  } 
  ngOnInit() {
    this.productService.getProducts();
    this.resetForm();
    
  }
  onSubmit(productForm: NgForm){
    if(productForm.value.$key == null)
      this.productService.insertProduct(productForm.value)
    else
      
      this.productService.UpdateProduct(productForm.value);
      this.resetForm(productForm);
  }
  resetForm(productForm?: NgForm){
    if(productForm != null){
      productForm.reset();
      this.productService.selectedProduct = new Product();
    }
  }

}
