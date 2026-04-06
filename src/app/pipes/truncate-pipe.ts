import { Pipe, PipeTransform } from '@angular/core';

// Truncates long text to a specified character limit and adds ellipsis
@Pipe({
  name: 'truncate',
  standalone: true
})
export class TruncatePipe implements PipeTransform {

  // limit: max number of characters to show (default 50)
  // trail: what to append at the end (default '...')
  transform(value: string, limit: number = 50, trail: string = '...'): string {
    if (!value) return '';
    return value.length > limit ? value.substring(0, limit) + trail : value;
  }

}