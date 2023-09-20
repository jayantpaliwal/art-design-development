import { Component, ElementRef, HostListener, Input } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { faPenToSquare, faTrash, faArrowRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { Add2ProductComponent } from '../add-sub1-product/add-sub1-product.component';
import { ActivatedRoute, NavigationEnd } from '@angular/router';
import { UpdateProductComponent } from '../update-product/update-product.component';
import { FormBuilder } from '@angular/forms';
import { DatabaseService } from '../services/database.service';
import Swal from 'sweetalert2';
import { UpdateSubsectionComponent } from '../update-subsection/update-subsection.component';
import { Subject } from 'rxjs';
// import { FormsModule } from '@angular/forms';

declare var $: any;

@Component({
  selector: 'app-sub-section',
  templateUrl: './sub-section.component.html',
  styleUrls: ['./sub-section.component.css']
})
export class SubSectionComponent {

  icon1 = faPenToSquare;
  icon = faTrash;
  icon3 = faArrowRotateLeft;
  currentRoute: string | undefined;
  products: any = [];
  productId: any;
  productName: any;
  searchText: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 7;
  tableSizes: any = [3, 6, 9, 12];
  hoverIndex: number = -1;
  
  constructor(private router: Router, public dialog: MatDialog, private activatedRoute: ActivatedRoute, private sql: DatabaseService, private fb: FormBuilder) {
    // this.activatedRoute.params.subscribe(params => {
    //   // this.productId = params.get('productId');
    //   // this.productName = params.get('productName');
    //   console.log(params);

    // });
    this.activatedRoute.paramMap.subscribe(params => {
      this.productId = params.get('productId');
      this.productName = params.get('productName');
    });
  }

  onHover(i: number) {
    this.hoverIndex = i;
    
  }

  backClicked() {
    window.history.back();
  }


  ngOnInit(): void {
    this.getData();


  }
  insertData(product: any, productId: any) {
    this.sql.insertIntoProductsSubCategory1Table(product, productId).then((res) => {
    })
  }

  getData() {
    this.sql.getAllSubCategoryProducts1(this.productId).then((res: any) => {
      this.products = res.result;
    })
  }

  addProduct() {
    const dialogRef = this.dialog.open(Add2ProductComponent);
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

  goToSubSec2(product: any) {
    if (product.subCategoryValue == 'true') {
      // this.router.navigate(['/sub-sec2', product]);
      // debugger
      this.router.navigate(['/sub-sec2', product.subCategoryId, product.productName], { queryParams: { subset: '2' } });

    }
    // else {
    //   Swal.fire({
    //     text: "Sorry, No Sub-Section Added!",
    //     icon: 'warning',
    //     confirmButtonColor: '#3085d6',
    //     cancelButtonColor: '#d33',
    //   }
    //   )
    // }

  }

  edit(product: any) {
    const dialogRef = this.dialog.open(UpdateSubsectionComponent,
      {
        data: { product : product }
      }

    );
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result !== undefined) {
        debugger
        result = {
          // qr: result.product.qr,
          image: result.product.image,
          name: result.product.name,
          code: result.product.code,
          height: result.product.height,
          width: result.product.width,
          depth: result.product.depth,
          price: result.product.price,
          quantity: result.product.quantity,
          description: result.product.description,
          subCategoryValue: result.product.subCategoryValue
        }
        this.sql.updateSubProduct1(result, product);
        this.getData();
        debugger
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
        this.sql.deleteFromSubCategoryProducts1(productId).then((res: any) => {
        });
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

