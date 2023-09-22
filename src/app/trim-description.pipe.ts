import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trimDescription'
})
export class TrimDescriptionPipe implements PipeTransform {
  transform(description: string, linesToShow: number = 2): string {
    const lines = description.split('\n');
    if (lines.length > linesToShow) {
      return lines.slice(0, linesToShow).join('\n') + '...';
    }
    return description;
  }
}
