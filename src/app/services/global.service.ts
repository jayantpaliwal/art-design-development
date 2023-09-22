import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor() { }

  compressImage(imageData:any): Promise<string> {
    return new Promise((resolve) => { {
  
    const targetSizeKB = 100; // Desired target size in kilobytes
    const qualityIncrement = 0.1; // Adjust as needed for your compression
  
    const canvas = document.createElement('canvas');
    const ctx:any = canvas.getContext('2d');
    const img = new Image();
    img.src = imageData;
  
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
  
      let quality = 1.0; // Initial quality setting (100%)
      let compressedData;
      
      do {
        // Compress the image with the current quality setting
        compressedData = canvas.toDataURL('image/jpeg', quality);
        // Reduce the quality setting for the next iteration
        quality -= qualityIncrement;
      } while (compressedData.length > targetSizeKB * 1024 && quality > 0);
  
      // preview.src = compressedData;
      resolve(compressedData); // Resolve the promise with the compressed image data
      console.log(targetSizeKB);
    };
  }
  });
  
  }
}
