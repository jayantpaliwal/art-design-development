import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './add-home-product/add-home-product.component';

import { UpdateProductComponent } from './update-product/update-product.component';
import { AllProductComponent } from './home/home.component';

import { Add2ProductComponent } from './add-sub1-product/add-sub1-product.component';
import { SubSectionComponent } from './sub-section/sub-section.component';
import { SubSec2Component } from './sub-sec2/sub-sec2.component';
import { HoverDetailComponent } from './hover-detail/hover-detail.component';

const routes: Routes = [
  {
  path : 'add-product',
  component: AddProductComponent
  },
  {
    path : 'all-product',
    component : AllProductComponent,
  },
  {
    path : '',
    component : AllProductComponent
  },
  {
    path : 'update-product',
    component : UpdateProductComponent
  },
  {
    path : 'sub-section/:productId/:productName',
    component : SubSectionComponent
  },
  {
    path :'add2-product',
    component: Add2ProductComponent
  },
  {
    path : 'sub-sec2/:subCategoryId/:productName',
    component : SubSec2Component
  },
  {
    path : 'hover-detail',
    component : HoverDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
