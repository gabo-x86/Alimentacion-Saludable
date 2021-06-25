import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { from } from 'rxjs';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';//Data binding

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';

//firebase
import {AngularFireModule} from 'angularfire2';
import{AngularFireDatabaseModule} from 'angularfire2/database';
import {environment} from '../environments/environment';
import {AngularFireAuthModule} from '@angular/fire/auth';

//components
import { ProductsComponent } from './components/products/products.component';
import { ProductLisComponent } from './components/products/product-lis/product-lis.component';
import { ProductComponent } from './components/products/product/product.component';

//services
import {ProductService} from './services/product.service';
import { importType } from '@angular/compiler/src/output/output_ast';
import { IniciarSesionComponent } from './iniciar-sesion/iniciar-sesion.component';
import { RegistroComponent } from './registro/registro.component';
import { AddProductComponent } from './add-product/add-product.component';
import { RecommendProductComponent } from './recommend-product/recommend-product.component';

import { AngularFireStorageModule } from '@angular/fire/storage';
import { UsuarioComponentComponent } from './usuario-component/usuario-component.component';
import { AppFiveDigitDecimaNumberDirective } from './app-five-digit-decima-number.directive';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    ProductLisComponent,
    HeaderComponent,
    FooterComponent,
    ListComponent,
    ProductComponent,
    DetailComponent,
    IniciarSesionComponent,
    RegistroComponent,
    AddProductComponent,
    RecommendProductComponent,
    UsuarioComponentComponent,
    AppFiveDigitDecimaNumberDirective,
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    AngularFireStorageModule
  ],
  providers: [
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
