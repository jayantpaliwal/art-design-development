import { Component, Inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-subsection',
  templateUrl: './update-subsection.component.html',
  styleUrls: ['./update-subsection.component.css']
})
export class UpdateSubsectionComponent {
  @Input() fromParent: any;
  productsEditForm: any = FormGroup;
  submitted: boolean = false;
  image: any = '';
  productName: any = [];
  isChecked: boolean = false;
  products: any;

  constructor(private fb: FormBuilder, private router: Router, public dialogRef: MatDialogRef<UpdateSubsectionComponent>,
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
      description: this.productsEditForm.value.productDescription,
      subCategoryValue: this.isChecked
    }
    // this.sql.set(product);
    this.dialogRef.close({ 'product': product });

  }


  check(event: any) {
    console.log(event.target.checked);
    if (event.target.checked) {
      this.isChecked = true;
    }
    else {
      this.isChecked = false;
    }
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

