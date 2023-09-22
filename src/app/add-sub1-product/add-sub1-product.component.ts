import { Component, Inject } from '@angular/core';
import { product } from '../data-type';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap/modal/modal.module';
import { AbstractControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { DatabaseService } from '../services/database.service';
import { GlobalService } from '../services/global.service';
@Component({
  selector: 'app-add-sub1-product',
  templateUrl: './add-sub1-product.component.html',
  styleUrls: ['./add-sub1-product.component.css']
})
export class Add2ProductComponent {
  // product: any;
  productForm: any = FormGroup;
  submitted: boolean = false;
  image: any = "";
  counts: any;
  isChecked:boolean = false;
  
  constructor(public dialogRef: MatDialogRef<Add2ProductComponent>, private sql: DatabaseService,
    @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, private global: GlobalService) {
    dialogRef.disableClose = true;

    this.productForm = fb.group({
      // productQr: [''],
      productImage: [''],
      productName: [''],
      productCode: [''],
      productHeight: [''],
      productWidth: [''],
      productDepth: [''],
      productPrice: [''],
      productQuantity: [''],
      productDescription: ['']
    })
    
  }


  ngOnInit() {

  }
  addProduct(data: any) {
    if(this.productForm.invalid){
      return;
    }
    this.submitted = true;
       this.global.compressImage(this.image).then((compressedImageData:any) => {
      var product = {
        image: compressedImageData,
        name: this.productForm.value.productName,
        code: this.productForm.value.productCode,
        height: this.productForm.value.productHeight,
        width: this.productForm.value.productWidth,
        depth: this.productForm.value.productDepth,
        price: this.productForm.value.productPrice,
        quantity: this.productForm.value.productQuantity,
        description: this.productForm.value.productDescription,
        subCategoryValue: this.isChecked
    }
    this.dialogRef.close({ 'product': product });
  });
  }

  check(event:any){
    console.log(event.target.checked);
    if(event.target.checked){
      this.isChecked = true;
    }
    else{
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
      this.global.compressImage(this.image);
    }
    myReader.readAsDataURL(file);
  }

  onCancel() {
    this.dialogRef.close();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.productForm.controls;
  }
}