import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent}  from '../app/home/home.component';
import {MenuComponent}  from './menu/menu.component';

const routes: Routes = [
{path : 'home', component:HomeComponent},
{path : 'menu',component:MenuComponent},
{path: '', redirectTo:'/home',pathMatch:'full'},];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
