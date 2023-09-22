import { Component, HostListener, Input, OnInit } from '@angular/core';
import { NavigationExtras, Route, Router } from '@angular/router';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AddProductComponent } from '../add-home-product/add-home-product.component';
import { UpdateProductComponent } from '../update-product/update-product.component';
import { FormBuilder } from '@angular/forms';
import { DatabaseService } from '../services/database.service';
import { Options } from 'ngx-qrcode-styling';
import Swal from 'sweetalert2';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
// import { faArrowRotateLeft}'@fortawesome/free-solid-svg-icons'
// import { product } from '../data-type';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class AllProductComponent implements OnInit {
  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  faEdit = faPenToSquare;
  faTrash = faTrash;
  // faEdit = faEdit;
  // faTrash = faTrash;
  products: any = [];
  @Input() name: any;
  searchText: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [3, 6, 9, 12];

  public config: Options = {
    width: 110,
    height: 110,
    // data: 'https://qr.unlikeanythings.com/',
    image: "assets/color-print-qr.jpg",
    margin: 0,
  }
  counts: any;

  constructor(public dialog: MatDialog, private router: Router, private fb: FormBuilder, private sql: DatabaseService) {

  }


  ngOnInit(): void {
    // create database
    this.sql.createProductsTable();
    this.sql.createProductsSubCategory1Table();
    this.sql.createProductsSubCategory2Table();
    this.getData();
  }

  getData() {
    this.sql.getAllProducts().then((res: any) => {
      this.products = res.result;
    })
  }

  goToAddNewProduct() {
    const dialogRef = this.dialog.open(AddProductComponent);
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result && result.product) {
        this.sql.insertIntoProductsTable(result.product).then((res) => {
          this.getData();
        })
        console.log(result, result.product);

      }
    });
  }
  onTableDataChange(event: any) {
    this.page = event;
    this.getData();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getData();
  }

  edit(product: any) {
    const dialogRef = this.dialog.open(UpdateProductComponent,
      {
        data: { productName: product.productName, productQr: product.productQr }
      }

    );
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result !== undefined) {

        result = {
          qr: result.product.qr,
          image: result.product.image,
          name: result.product.name,
        }
        this.sql.updateProductImageName(result, product);
        this.getData();

      }
    });
  }

  delete(productId: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result:any) => {
      if (result.isConfirmed) {
        this.sql.deleteFromProductsTable(productId).then((res: any) => {
          // this.sql.getCount(productId);
        })
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        this.getData();
      }
    })
  }

  printTable() {
    var table: any = document.getElementById('myTable');
    const clonedTable: any = table.cloneNode(true);
    const actionCells = clonedTable.getElementsByClassName('no-print');
    while (actionCells.length > 0) {
      actionCells[0].remove();
    }
    var newWin: any = window.open('', 'Print-Window');
    newWin.document.open();
    // <style>table { border-collapse: collapse; width: 100%; } table, th, td { border: 1px solid black; } img { max-width: 100%; height: auto; }</style>
    newWin.document.write('<html><head><style>table { border-collapse: collapse;   width: 100%; } table, th, td { border: 1px solid black;  } img { max-width: 100%; height: 150px; object-fit:contain ; display: block; margin-left: auto;  margin-right: auto; width:50%; }</style></head><body onload="window.print()">' + clonedTable.outerHTML + '</body></html>');
    newWin.document.close();
    setTimeout(function () {
      newWin.close();
    }, 10);
  }


  goToSubSec(product: any) {
    // this.router.navigate(['/sub-section', productId]);
    this.router.navigate(['/sub-section', product.productId, product.productName], { queryParams: { subset: '1' } });
  }

}




