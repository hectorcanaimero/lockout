import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unitConverted'
})
export class UnitConvertedPipe implements PipeTransform {

  transform(kilometer:number): string {
    let value: string;
    const km = 1000;
    if (kilometer < 1) {
      const calc = kilometer * km;
      const sufixo = calc === 1 ? 'mt' : 'mts';
      value = `${calc.toFixed(0)} ${sufixo}.`;
    }
    else if (kilometer >= 0 && kilometer < 2) {
      value = `${kilometer.toFixed(1).replace('.', ',')} km.`
    }
    else {
      value = `${kilometer.toFixed(1).replace('.', ',')} kms.`
    }
    return value;
  }

}


