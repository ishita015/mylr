import { Pipe, PipeTransform } from '@angular/core';
import { lrList } from './../pages/models/lrlist';
@Pipe({
    name: 'lrListFilter',
    pure: false
})
export class lrListPipe implements PipeTransform {
    transform(items: lrList[], filter: lrList): any {
        if (!items || !filter) {
            return items;
        }
        // filter items array, items which match and return true will be
        // kept, false will be filtered out
        return items.filter((item: lrList) => this.applyFilter(item, filter));
    }
    applyFilter(book: lrList, filter: lrList): boolean {
        for (const field in filter) {
           // console.log(filter[field] + '       ' + book[field] + '
           //   ' + (filter[field] === book[field]) + '  ' + (filter[field] === book[field]))
            if (book[field]) {
                if (filter[field]) {
                    if (typeof filter[field] === 'string') {

                        if (book[field].toLowerCase().indexOf(filter[field].toLowerCase()) === -1) {
                            return false;
                        }
                    } else if (typeof filter[field] === 'number') {
                        if (book[field] !== filter[field]) {
                            return false;
                        }
                    } else if (filter[field] === 'date') {
                        if (book[field] !== filter[field]) {
                            return false;
                        }
                    }
                }
            }

        }
        return true;
    }
}