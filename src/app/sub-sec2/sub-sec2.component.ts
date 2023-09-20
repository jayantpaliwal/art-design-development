import { Component } from '@angular/core';
import { faPenToSquare, faTrash, faArrowRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HoverDetailComponent } from '../hover-detail/hover-detail.component';
import { ActivatedRoute, NavigationEnd } from '@angular/router';
import { UpdateProductComponent } from '../update-product/update-product.component';
import { Add2ProductComponent } from '../add-sub1-product/add-sub1-product.component';
import { DatabaseService } from '../services/database.service';
import Swal from 'sweetalert2';
import { AddSub2ProductComponent } from '../add-sub2-product/add-sub2-product.component';
import { UpdateSubsection2Component } from '../update-subsection2/update-subsection2.component';

declare var $: any;

@Component({
  selector: 'app-sub-sec2',
  templateUrl: './sub-sec2.component.html',
  styleUrls: ['./sub-sec2.component.css']
})
export class SubSec2Component {
  icon1 = faPenToSquare;
  icon = faTrash;
  currentRoute: string | undefined;
  products: any = [];
  productId: any;
  productName: any;
  searchText:any ;
  page: number = 1;
  count: number = 0;
  tableSize: number = 7;
  tableSizes: any = [3, 6, 9, 12];
  hoverIndex:number = -1;
  constructor(public dialog: MatDialog, private router: Router, private activatedRoute: ActivatedRoute, private sql: DatabaseService) {
    this.activatedRoute.paramMap.subscribe(params => {
      this.productId = params.get('subCategoryId');
      this.productName = params.get('productName');
    });
    
  }
  onHover(i:number){
    this.hoverIndex = i;
   }
  
  ngOnInit() {
    this.getData();
  }

  backClicked() {
    window.history.back();
  }

  insertData(product: any, productId: any) {
    this.sql.insertIntoProductsSubCategory2Table(product, productId).then((res) => {
    })
  }

  getData() {
    this.sql.getAllSubCategoryProducts2(this.productId).then((res: any) => {
      this.products = res.result;
    })
  }


  addProduct() {
    const dialogRef = this.dialog.open(AddSub2ProductComponent);
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result && result.product) {
        this.insertData(result.product, this.productId);
        this.getData();
      }
    })
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
    const dialogRef = this.dialog.open(UpdateSubsection2Component,
      {
        data: { product: product }
      }

    );
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result !== undefined) {
        result = {
          // qr: result.product.qr,
          image: result.product.image,
          name: result.product.name,
          code:  result.product.code,
          height: result.product.height,
          width: result.product.width,
          depth: result.product.depth,
          price: result.product.price,
          quantity: result.product.quantity,
          description: result.product.description
          
        }
        
        this.sql.updateSubProduct2(result, product);
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
    }).then((result) => {
      if (result.isConfirmed) {
        this.sql.deleteFromSubCategoryProducts2(productId).then((res: any) => {
        });
        debugger
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
    newWin.document.write('<html><head><style>table { border-collapse: collapse; } table, th, td { border: 1px solid black; }</style></head><body onload="window.print()">' + clonedTable.outerHTML + '</body></html>');
    newWin.document.close();
    setTimeout(function () {
      newWin.close();
    }, 10);
  }

}
