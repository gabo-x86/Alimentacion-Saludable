import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { from } from 'rxjs';
import {FormsModule} from '@angular/forms';//Data binding

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { ListComponent } from './list/list.component';

//firebase
import {AngularFireModule} from 'angularfire2';
import{AngularFireDatabaseModule} from 'angularfire2/database';
import {environment} from '../environments/environment';

//components
import { ProductsComponent } from './components/products/products.component';
import { ProductLisComponent } from './components/products/product-lis/product-lis.component';
import { ProductComponent } from './components/products/product/product.component';

//services
import {ProductService} from './services/product.service';
import { importType } from '@angular/compiler/src/output/output_ast';


@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    ProductLisComponent,
    HeaderComponent,
    FooterComponent,
    ListComponent,
    ProductComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
