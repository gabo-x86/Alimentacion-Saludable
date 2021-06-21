import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailComponent } from './detail/detail.component';
import { ListComponent } from './list/list.component';
import { IniciarSesionComponent } from './iniciar-sesion/iniciar-sesion.component';
import { RegistroComponent } from './registro/registro.component';
import { LoginGuardGuard } from './guards/login-guard.guard';
import { AddProductComponent } from './add-product/add-product.component';
import { RecommendProductComponent } from './recommend-product/recommend-product.component';



const routes: Routes = [
  {path: '', component: ListComponent},
  {path: 'detail', component: DetailComponent},
  {path: 'login', component: IniciarSesionComponent, canActivate:[LoginGuardGuard]},
  {path: 'registro', component: RegistroComponent, canActivate:[LoginGuardGuard]},
  {path: 'add-product', component: AddProductComponent},
  {path: 'recommend-product', component: RecommendProductComponent},
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }