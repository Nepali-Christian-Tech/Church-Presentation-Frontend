import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customSearch',
  standalone: true
})
export class CustomSearchPipe implements PipeTransform {

  transform(items: any[], searchText: string, ...keys: string[]): any[] {
    if (!items || !searchText) {
      return items;
    }

    const lowerCaseSearchText = searchText.toLowerCase();

    return items.filter(item =>
      keys.some(key =>
        (item[key]?.toString() || '').toLowerCase().includes(lowerCaseSearchText)
      )
    );
  }

}
