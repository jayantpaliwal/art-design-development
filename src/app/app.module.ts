import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddProductComponent } from './add-home-product/add-home-product.component';
import { HeaderComponent } from './header/header.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
// import { ProductListComponent } from './product-list/product-list.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AllProductComponent } from './home/home.component';
import { Add2ProductComponent } from './add-sub1-product/add-sub1-product.component';
import { SubSectionComponent } from './sub-section/sub-section.component';
import { RouterModule } from '@angular/router';
// import { mat } from '@angular/platform-browser';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SubSec2Component } from './sub-sec2/sub-sec2.component';
import { HoverDetailComponent } from './hover-detail/hover-detail.component';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { NgxQrcodeStylingModule } from 'ngx-qrcode-styling';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { UpdateSubsectionComponent } from './update-subsection/update-subsection.component';
import { AddSub2ProductComponent } from './add-sub2-product/add-sub2-product.component';
import { UpdateSubsection2Component } from './update-subsection2/update-subsection2.component';
import { NgxPrintModule } from 'ngx-print';
import {MatCardModule} from '@angular/material/card';
import { TrimDescriptionPipe } from './trim-description.pipe';
import { FilterPipe } from './pipe/filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AddProductComponent,
    HeaderComponent,
    UpdateProductComponent,
    AllProductComponent,
    Add2ProductComponent,
    SubSectionComponent,
    SubSec2Component,
    HoverDetailComponent,
    UpdateSubsectionComponent,
    AddSub2ProductComponent,
    UpdateSubsection2Component,
    TrimDescriptionPipe,
    FilterPipe

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([], { useHash: false }),
    AppRoutingModule,
    CommonModule,
    FontAwesomeModule,
    MatIconModule,
    MatButtonModule,
    NgbModule, 
    MatDialogModule,
    BrowserAnimationsModule,
    NgxQRCodeModule,
    NgxQrcodeStylingModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    MatCardModule,
    NgxPrintModule
  ],
  providers: [NgbActiveModal],
  bootstrap: [AppComponent]
})
export class AppModule { }