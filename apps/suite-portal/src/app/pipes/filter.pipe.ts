import { Pipe, PipeTransform } from '@angular/core';
import { MaintenanceRequestRespond } from '@suiteportal/api-interfaces';

@Pipe({
  name: 'filterClosedRequest',
  pure: false,
})
export class FilterClosedRequestPipe implements PipeTransform {
  transform(items: MaintenanceRequestRespond[]): MaintenanceRequestRespond[] {
    return items.filter((item) => !item.closedAt);
  }
}
