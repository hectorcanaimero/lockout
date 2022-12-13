import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unitConverted'
})
export class UnitConvertedPipe implements PipeTransform {

  transform(kilometer:number): string {
    const km = 1000;
    let calculate: number;
    calculate = kilometer / km;
    if (calculate >= 1) {
      return `${calculate} km.`
    }
    calculate = calculate * km;
    return `${calculate} mts.`;
  }

}
