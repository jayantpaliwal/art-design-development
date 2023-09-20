import { Injectable } from '@angular/core';

declare var window: any;
var db = window.openDatabase("lotData", '1.0', "Product Records", 2 * 1024 * 1024);


@Injectable({
  providedIn: 'root'
})
export class DatabaseService {


  constructor() { }

  createProductsTable() {
    db.transaction(function (tx: any) {
      tx.executeSql("CREATE TABLE IF NOT EXISTS lotProducts (productId INTEGER PRIMARY KEY AUTOINCREMENT, productImage text, productName text, productQr text)");
    });
  }


  insertIntoProductsTable(product: any) {
    return new Promise((resolve, reject) => {
      db.transaction(function (tx: any) {
        tx.executeSql("INSERT into lotProducts ( productImage, productName, productQr) values ( ?, ?, ? )", [product.image, product.name, product.qr],

          function (tx: any, result: any) {
            if (result && result.rowsAffected) {
              resolve({ response: true });
            }
            else {
              reject({ response: false });
            }
          });
      });
    })
  }


  updateProductImageName(data: any, product: any) {
    return new Promise((resolve, reject) => {
      db.transaction((tx: any) => {
        tx.executeSql(
          'UPDATE lotProducts SET productQr=?, productImage=?, productName=? WHERE productId=?',
          [data.qr, data.image ? data.image : product.productImage, data.name, product.productId],
          function (tx: any, result: any) {
            if (result.rowsAffected) {
              resolve({ result: true });
            } else {
              reject({ result: false });
            }
          }
        );
      });
    });
  }

  deleteFromProductsTable(productId: any) {
    return new Promise((resolve, reject) => {
      db.transaction(function (tx: any) {
        tx.executeSql("DELETE FROM lotProducts WHERE productId=? ", [productId],
          function (tx: any, result: any) {
            // if (result.rows.length) {
            //   resolve({ result: result.rows });
            // }
            // else {
            //   reject({ result: null });
            // }
          })
      })
    })
  }


  getAllProducts() {
    return new Promise((resolve, reject) => {
      db.transaction(function (tx: any) {
        tx.executeSql('select * from lotProducts', [],
          (tx: any, results: any) => {
            var products = [];
            for (var i = 0; i < results.rows.length; i++) {
              products.push(results.rows.item(i));
            }
            resolve({ result: products });

          })
      });
    })
  }


  createProductsSubCategory1Table() {
    db.transaction(function (tx: any) {
      tx.executeSql("CREATE TABLE IF NOT EXISTS lotProductsSubCategory1 (subCategoryId INTEGER PRIMARY KEY NOT NULL,fId int,  productImage text, productName text, productCode text, productHeight int, productWidth int, productDepth int, productPrice int, productQuantity int, productDescription text, subCategoryValue text )");
    });
  }

  insertIntoProductsSubCategory1Table(product: any, productId:any) {
    return new Promise((resolve, reject) => {
      db.transaction(function (tx: any) {
        tx.executeSql("INSERT into lotProductsSubCategory1 (fId,  productImage, productName, productCode , productHeight, productWidth, productDepth, productPrice, productQuantity, productDescription, subCategoryValue) values ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )", [productId, product.image, product.name, product.code?product.code:"", product.height?product.height:"", product.width?product.width:"", product.depth?product.depth:"", product.price?product.price:"", product.quantity?product.quantity:"", product.description?product.description:"", product.subCategoryValue],
          function (tx: any, result: any) {
            if (result && result.rowsAffected) {
              resolve({ response: true });
            }
            else {
              reject({ response: false });
            }
          });
      });
    })
  }



  getAllSubCategoryProducts1(productId:any) {
    return new Promise((resolve, reject) => {
      db.transaction(function (tx: any) {
        tx.executeSql('select * from lotProductsSubCategory1 WHERE fId=' + productId , [],
          (tx: any, results: any) => {
            var products = [];
            for (var i = 0; i < results.rows.length; i++) {
              products.push(results.rows.item(i));
            }
            resolve({ result: products });

          })
      });
    })
  }
  updateSubProduct1(data:any, product:any){
    return new Promise((resolve, reject) => {
      db.transaction((tx: any) => {
        tx.executeSql(
          'UPDATE lotProductsSubCategory1 SET productImage=?, productName=?, productCode=? , productHeight=?, productWidth=?, productDepth=?, productPrice=?, productQuantity=?, productDescription=?, subCategoryValue=? WHERE subCategoryId=? ', 
          [ data.image ? data.image : product.productImage, data.name, data.code?data.code:"", data.height?data.height:"", data.width?data.width:"", data.depth? data.depth:"", data.price?data.price:"", data.quantity?data.quantity:"", data.description?data.description:"", data.subCategoryValue,  product.subCategoryId],
          function (tx: any, result: any) {
            if (result.rowsAffected) {
              resolve({ result: true });
            } else {
              reject({ result: false });
            }
          }
        );
      });
    });
  }

  deleteFromSubCategoryProducts1(productId: any) {
    return new Promise((resolve, reject) => {
      db.transaction(function (tx: any) {
        tx.executeSql("DELETE FROM lotProductsSubCategory1 WHERE subCategoryId=? ", [productId],
          function (tx: any, result: any) {
            // if (result.rows.length) {
            //   resolve({ result: result.rows });
            // }
            // else {
            //   reject({ result: null });
            // }
          })
      })
    })
  }

  
  createProductsSubCategory2Table() {
    db.transaction(function (tx: any) {
      tx.executeSql("CREATE TABLE IF NOT EXISTS lotProductsSubCategory2 (subCategoryId2 INTEGER PRIMARY KEY NOT NULL,fId2 int, productImage text, productName text, productCode text, productHeight int, productWidth int, productDepth int, productPrice int, productQuantity int, productDescription text)");
    });
  }

  insertIntoProductsSubCategory2Table(product: any, productId:any) {
    return new Promise((resolve, reject) => {
      db.transaction(function (tx: any) {
        tx.executeSql("INSERT into lotProductsSubCategory2 (fId2,  productImage, productName, productCode , productHeight, productWidth, productDepth, productPrice, productQuantity, productDescription) values ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [productId, product.image, product.name, product.code?product.code:"", product.height?product.height:"", product.width?product.width:"", product.depth?product.depth:"", product.price?product.price:"", product.quantity?product.quantity:"", product.description?product.description:""],
          function (tx: any, result: any) {
            if (result && result.rowsAffected) {
              resolve({ response: true });
            }
            else {
              reject({ response: false });
            }
          });
      });
    })
  }
  getAllSubCategoryProducts2(productId:any) {
    return new Promise((resolve, reject) => {
      db.transaction(function (tx: any) {
        tx.executeSql('select * from lotProductsSubCategory2 WHERE fId2=' + productId , [],
          (tx: any, results: any) => {
            var products = [];
            for (var i = 0; i < results.rows.length; i++) {
              products.push(results.rows.item(i));
            }
            resolve({ result: products });

          })
      });
    })
  }
 
  updateSubProduct2(data:any, product:any){
    return new Promise((resolve, reject) => {
      db.transaction((tx: any) => {
        tx.executeSql(
          'UPDATE lotProductsSubCategory2 SET productImage=?, productName=?, productCode=? , productHeight=?, productWidth=?, productDepth=?, productPrice=?, productQuantity=?, productDescription=? WHERE subCategoryId2=? ', 
          [ data.image ? data.image : product.productImage, data.name, data.code?data.code:"", data.height?data.height:"", data.width?data.width:"", data.depth? data.depth:"", data.price?data.price:"", data.quantity?data.quantity:"", data.description?data.description:"",  product.subCategoryId2],
          function (tx: any, result: any) {
            if (result.rowsAffected) {
              resolve({ result: true });
            } else {
              reject({ result: false });
            }
          }
        );
      });
    });
  }

  deleteFromSubCategoryProducts2(productId: any){
    return new Promise((resolve, reject) => {
      db.transaction(function (tx: any) {
        tx.executeSql("DELETE FROM lotProductsSubCategory2 WHERE subCategoryId2=? ", [productId],
        
          function (tx: any, result: any) {
            // if (result.rows.length) {
            //   resolve({ result: result.rows });
            // }
            // else {
            //   reject({ result: null });
            // }
          })
      })
    })
  }


 /*  getAllSubCategoryProducts(productId: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const promises = [];
  
      // Query 1
      promises.push(new Promise((resolveQuery1, rejectQuery1) => {
        db.transaction(function (tx: any) {
          tx.executeSql('select * from lotProductsSubCategory1 WHERE fId=' + productId, [],
            (tx: any, results: any) => {
              var products = [];
              for (var i = 0; i < results.rows.length; i++) {
                products.push(results.rows.item(i));
              }
              resolveQuery1(products);
            },
            (error: any) => {
              rejectQuery1(error);
            });
        });
      }));
  
      // Query 2
      promises.push(new Promise((resolveQuery2, rejectQuery2) => {
        db.transaction(function (tx: any) {
          tx.executeSql('select * from lotProductsSubCategory2 WHERE fId2=' + productId, [],
            (tx: any, results: any) => {
              var products = [];
              for (var i = 0; i < results.rows.length; i++) {
                products.push(results.rows.item(i));
              }
              resolveQuery2(products);
            },
            (error: any) => {
              rejectQuery2(error);
            });
        });
      }));
  
      // Execute both queries and combine the results
      Promise.all(promises)
        .then((results: any[]) => {
          const combinedProducts = results.reduce((combined, products) => combined.concat(products), []);
          resolve({ result: combinedProducts });
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  } */
  

}
