import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Add2ProductComponent } from '../add-sub1-product/add-sub1-product.component';
import { DatabaseService } from '../services/database.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-add-sub2-product',
  templateUrl: './add-sub2-product.component.html',
  styleUrls: ['./add-sub2-product.component.css']
})
export class AddSub2ProductComponent {
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
        description: this.productForm.value.productDescription
      }
    this.dialogRef.close({ 'product': product });
    })
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

}
