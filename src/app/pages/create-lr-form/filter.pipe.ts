import { Pipe, PipeTransform } from '@angular/core';
// import { listbodycondition } from 'app/models/listbodycondition';
// import {lrCreate} from './../models/lr-create';
import {searchConsignorList} from './../models/searchConsignorList';
@Pipe({
    name: 'createLrFilter',
    pure: false
})
export class CreateLrFilterPipe implements PipeTransform {
    transform(items: searchConsignorList[], filter: searchConsignorList): any {
        if (!items || !filter) {
            return items;
        }
        return items.filter((item: searchConsignorList) => this.applyFilter(item, filter));
    }
    applyFilter(book: searchConsignorList, filter: searchConsignorList): boolean {
        for (let field in filter) {
            console.log(filter[field]+"     "+book[field]+"  "+(filter[field]==book[field])+"  "+(filter[field]===book[field]))
            if(book[field]){
                if (filter[field]) {
                    if (typeof filter[field] === 'string') {
                        
                      if (book[field].toString().toLowerCase().indexOf(filter[field].toLowerCase()) === -1) {
                        return false;
                      }
                    } else if (typeof filter[field] === 'number') {
                      if (book[field] !== filter[field]) {
                        return false;
                      }
                    }
                    else if ( filter[field] == 'date') {
                        if (book[field] !== filter[field]) {
                          return false;
                        }
                      }
                      else if ( filter[field] == 'boolean') {
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
