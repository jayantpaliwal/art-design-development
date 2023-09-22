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
    var table: any = document.getElementById('print-section');
    // const clonedTable: any = table.cloneNode(true);
    // const actionCells = clonedTable.getElementsByClassName('no-print');
    // while (actionCells.length > 0) {
    //   actionCells[0].remove();
    // }
    var newWin: any = window.open('', 'Print-Window');
    newWin.document.open();
    // <style>table { border-collapse: collapse; width: 100%; } table, th, td { border: 1px solid black; } img { max-width: 100%; height: auto; }</style>
    newWin.document.write('<html><head><style>img { max-width: 100%; height: 200px; object-fit:contain ; display: block; margin-left: auto;  margin-right: auto;  } h4{ font-size: 15px}</style></head><body onload="window.print()">' + table.outerHTML + '</body></html>');
    newWin.document.close();
    setTimeout(function () {
      newWin.close();
    }, 10);
  }

}
