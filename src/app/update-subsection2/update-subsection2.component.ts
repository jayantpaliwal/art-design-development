import { Component, Inject, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-subsection2',
  templateUrl: './update-subsection2.component.html',
  styleUrls: ['./update-subsection2.component.css']
})
export class UpdateSubsection2Component {
  @Input() fromParent: any;
  productsEditForm: any = FormGroup;
  submitted: boolean = false;
  image: any = '';
  productName: any = [];
  isChecked:boolean  = false;
  products:any =[];

  constructor(private fb: FormBuilder, private router: Router, public dialogRef: MatDialogRef<UpdateSubsection2Component>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    dialogRef.disableClose = true;
    this.productsEditForm = this.fb.group({
      productImage: [''],
      productName: [''],
      productCode: [''],
      productHeight: [''],
      productWidth: [''],
      productDepth: [''],
      productPrice: [''],
      productQuantity: [''],
      productDescription: ['']
    });
    this.products = this.data.product;
  }

  ngOnInit() {
    this.productsEditForm.patchValue({
      productName: this.products.productName,
      productCode: this.products.productCode,
      productHeight: this.products.productHeight,
      productWidth : this.products.productWidth,
      productDepth : this.products.productDepth,
      productPrice : this.products.productPrice,
      productQuantity : this.products.productQuantity,
      productDescription : this.products.productDescription
    })
  }

  onCancel() {
    this.dialogRef.close();
  }

  submitData(data: any) {
    if (this.productsEditForm.invalid) {
      return;
    }

    this.submitted = true;
    var product = {
      // qr: `https://qr.unlikeanythings.com/${this.productsEditForm.value.productName}`,
      image: this.image,
      name: this.productsEditForm.value.productName,
      code: this.productsEditForm.value.productCode,
      height: this.productsEditForm.value.productHeight,
      width: this.productsEditForm.value.productWidth,
      depth: this.productsEditForm.value.productDepth,
      price: this.productsEditForm.value.productPrice,
      quantity: this.productsEditForm.value.productQuantity,
      description: this.productsEditForm.value.productDescription
    }
    // this.sql.set(product);
    this.dialogRef.close({ 'product': product });

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
