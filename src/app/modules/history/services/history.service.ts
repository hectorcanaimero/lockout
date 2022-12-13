import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { MasterService } from '@core/services/master.service';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor(
    private ms:MasterService
  ) { }

  getClosed = (id: number) => this.getHistory(id).pipe(
    map((res: any) => res.filter((row: any) => row.status === 'CLOSED') )
  )

  getCancelled = (id: number) => this.getHistory(id).pipe(
    map((res: any) => res.filter((row: any) => row.status === 'CANCELLED') )
  )

  getHistory = (id: number) => this.ms.getMaster(`service/company/history/?company=${id}&ordering=-data_reg`)
                                .pipe( map((res: any) => res.search));
}
