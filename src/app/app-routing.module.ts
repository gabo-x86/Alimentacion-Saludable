import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailComponent } from './detail/detail.component';
import { ListComponent } from './list/list.component';
import { IniciarSesionComponent } from './iniciar-sesion/iniciar-sesion.component';
import { RegistroComponent } from './registro/registro.component';
import { LoginGuardGuard } from './guards/login-guard.guard';
import { UserGuardGuard } from './guards/user-guard.guard'; 
import { AdminGuardGuard } from './guards/admin-guard.guard';
import { AddProductComponent } from './add-product/add-product.component';
import { RecommendProductComponent } from './recommend-product/recommend-product.component';
import{ UsuarioComponentComponent} from './usuario-component/usuario-component.component';



const routes: Routes = [
  {path: '', component: ListComponent},
  {path: 'detail', component: DetailComponent},
  {path: 'login', component: IniciarSesionComponent, canActivate:[LoginGuardGuard]},
  {path: 'registro', component: RegistroComponent, canActivate:[LoginGuardGuard]},
  {path: 'add-product', component: AddProductComponent, canActivate:[AdminGuardGuard]},
  {path: 'recommend-product', component: RecommendProductComponent, canActivate:[AdminGuardGuard]},
  {path: 'usuario-component', component: UsuarioComponentComponent, canActivate:[UserGuardGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }