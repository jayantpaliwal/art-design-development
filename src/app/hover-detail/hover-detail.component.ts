import { Component, Input, OnInit } from '@angular/core';
import { faPenToSquare, faTrash, faArrowRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { DatabaseService } from '../services/database.service';
import { ActivatedRoute, NavigationEnd } from '@angular/router';
import { SubSectionComponent } from '../sub-section/sub-section.component';



declare var $: any

@Component({
  selector: 'app-hover-detail',
  templateUrl: './hover-detail.component.html',
  styleUrls: ['./hover-detail.component.css']
})
export class HoverDetailComponent implements OnInit {
  icon1 = faPenToSquare;
  icon = faTrash;
  products: any = [];
  productId: any;
  productName: any;
  @Input() data: any;

  constructor(private sql: DatabaseService, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe(params => {
      this.productId = params.get('productId');
      this.productName = params.get('productName');

    });

  }
  ngOnInit() {
  }

  print(): void {
    let printContents, popupWin: any;
    printContents = document.getElementById('print-section')?.innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Print Product Details</title>
          <style>
          </style>
        </head>
    <body onload="window.print();window.close()" style="font-size:30px">${printContents}</body>
      </html>`

    );
    popupWin.document.close();
  }



}
