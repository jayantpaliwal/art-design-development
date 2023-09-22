import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { product } from '../data-type';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap/modal/modal';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AbstractControl, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { DatabaseService } from '../services/database.service';
import { GlobalService } from '../services/global.service';
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
    private sql: DatabaseService, private activatedRoute: ActivatedRoute, private router: Router, private global: GlobalService) 
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
    if(this.productsForm.invalid){
      return;
    }
    this.submitted = true;
    this.global.compressImage(this.image).then((compressedImageData:any) => {
    var product = {
      name: this.productsForm.value.productName,
      image : compressedImageData,
      // this.image,
      // qr: this.productsForm.value.productQr
      qr: this.productsForm.value.productQr?this.productsForm.value.productQr:`https://qr.unlikeanythings.com/${this.productsForm.value.productName}`
    }
    this.dialogRef.close({ 'product': product });
  });
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
      this.global.compressImage(this.image);
    }
    myReader.readAsDataURL(file);
  }

  // compressImage(imageData:any): Promise<string> {
  //   return new Promise((resolve) => { {
  
  //   const targetSizeKB = 100; // Desired target size in kilobytes
  //   const qualityIncrement = 0.1; // Adjust as needed for your compression
  
  //   const canvas = document.createElement('canvas');
  //   const ctx:any = canvas.getContext('2d');
  //   const img = new Image();
  //   img.src = imageData;
  
  //   img.onload = () => {
  //     canvas.width = img.width;
  //     canvas.height = img.height;
  //     ctx.drawImage(img, 0, 0);
  
  //     let quality = 1.0; // Initial quality setting (100%)
  //     let compressedData;
      
  //     do {
  //       // Compress the image with the current quality setting
  //       compressedData = canvas.toDataURL('image/jpeg', quality);
  //       // Reduce the quality setting for the next iteration
  //       quality -= qualityIncrement;
  //     } while (compressedData.length > targetSizeKB * 1024 && quality > 0);
  
  //     // preview.src = compressedData;
  //     resolve(compressedData); // Resolve the promise with the compressed image data
  //     console.log(targetSizeKB);
  //   };
  // }
  // });
  
  // }
  

}



