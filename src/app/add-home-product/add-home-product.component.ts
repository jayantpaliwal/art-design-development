import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { product } from '../data-type';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap/modal/modal';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AbstractControl, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { DatabaseService } from '../services/database.service';
// import { FormBuilder, FormControl, FormGroup } '@angular/forms';
// import { product } from '../data-type';
// import { ProductServiceService } from '../product-service.service';


@Component({
  selector: 'app-add-home-product',
  templateUrl: './add-home-product.component.html',
  styleUrls: ['./add-home-product.component.css']
})
export class AddProductComponent implements OnInit {

  isChecked: boolean = false;
  submitted: boolean = false;
  productName: string = '';
  image: any = "";
  counts: any;
  productsForm: any = FormGroup;

  constructor(public dialogRef: MatDialogRef<AddProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder,
    private sql: DatabaseService, private activatedRoute: ActivatedRoute, private router: Router) 
    {
    dialogRef.disableClose = true;
   
    this.productsForm = fb.group({
      productName: ['', Validators.required],
      productImage: [''],
      productQr: ['']
    })

  }



  ngOnInit(): void {
    // this.getCount();
  }


  yourFunction() {
    this.isChecked = !this.isChecked;
  }
  // submit(data: any) {
  // if(this.addProduct.invalid){
  //   return;
  // }
  // this.submitted = true;
  // var product{
  //   image = this.image,
  //   name= this.addProduct.value.productName
  // }
  // /}
  submit(data: any) {
    console.log(data);
    
    if(this.productsForm.invalid){
      return;
    }
    this.submitted = true;
    var product = {
      name: this.productsForm.value.productName,
      image : this.image,
      // qr: this.productsForm.value.productQr
      qr: this.productsForm.value.productQr?this.productsForm.value.productQr:`https://qr.unlikeanythings.com/${this.productsForm.value.productName}`
    }
    this.dialogRef.close({ 'product': product });
  }


  cancel() {
    this.dialogRef.close();
  }

  changeListener($event: { target: any; }): void {
    this.readThis($event.target);
  }

  readThis(inputValue: any): void {
    var file: File = inputValue.files[0];
    var myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.image = myReader.result;

    }
    myReader.readAsDataURL(file);
  }
}



