import { Component } from '@angular/core';
import { DatabaseService } from './services/database.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'art-design-development';
 

  constructor(private sql: DatabaseService) {
    // this.createTabls();
    // this.createSubCategoryTbl();
  }
  
  // createSubCategoryTbl() {
  //  
  // }
  // createTabls(){
  // 
    
  // }
}
