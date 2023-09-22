import { Component, Inject, Input } from '@angular/core';
import { product } from '../data-type';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap/modal/modal';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
// import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalService } from '../services/global.service';
@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent {
  @Input() fromParent: any;
  productsEditForm: any = FormGroup;
  submitted: boolean = false;
  image: any = '';
  productName: any = [];


  constructor(private fb: FormBuilder, private router: Router, public dialogRef: MatDialogRef<UpdateProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private global: GlobalService) {
    dialogRef.disableClose = true;
    this.productsEditForm = this.fb.group({
      productImage: [''],
      productName: ['', [Validators.required]],
      productQr: ['', Validators.required]
    });
    this.productName = this.data.productName;
  }
  ngOnInit() {

    this.productsEditForm.patchValue({
      productName : this.data.productName,
      productQr: this.data.productQr
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
  //   this.global.compressImage(this.image).then((compressedImageData:any) => {
  //   var product = {
  //     qr: this.productsEditForm.value.productQr?this.productsEditForm.value.productQr:`https://qr.unlikeanythings.com/${this.productsEditForm.value.productName}`,
  //     image: compressedImageData,
  //     name: this.productsEditForm.value.productName
  //   }
  //   console.log(product);
    
  //   // this.sql.set(product);
  //   this.dialogRef.close({ 'product': product });
  //  })
  if (this.image instanceof Blob) {
    this.global.compressImage(this.image).then((compressedImageData: any) => {
      var product:any = {
        qr: this.productsEditForm.value.productQr ? this.productsEditForm.value.productQr : `https://qr.unlikeanythings.com/${this.productsEditForm.value.productName}`,
        image: compressedImageData,
        name: this.productsEditForm.value.productName
      }
      console.log(product);
      
      // this.sql.set(product);
      this.dialogRef.close({ 'product': product });
    });
  } else {
    // No new image selected, use the last image
    var product:any = {
      qr: this.productsEditForm.value.productQr ? this.productsEditForm.value.productQr : `https://qr.unlikeanythings.com/${this.productsEditForm.value.productName}`,
      image: this.image, // Use the last image here
      name: this.productsEditForm.value.productName
    }
    console.log(product);
    
    // this.sql.set(product);
    this.dialogRef.close({ 'product': product });
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
      this.global.compressImage(this.image);
    }
    myReader.readAsDataURL(file);
  }
}
