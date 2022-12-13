import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-stars-widget',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.scss'],
})
export class StarsComponent implements OnInit {

  @Input() num: number;
  @Input() type = true;
  @Output() value = new EventEmitter();
  data = [];
  constructor() { }

  ngOnInit() {
    this.createArray(this.num);
  }

  createArray = (num: number = 4) => {
    const numero = num.toString().split('.');
    this.valueEntero(numero[0]);
    this.valueDecimal(numero[1]);
    this.valueFinal(numero[0]);
  };

  getClick = (item: number) => {
    this.data = [];
    const value = 1 + item;
    this.valueEntero(value.toString());
    this.valueFinal(value.toString());
    this.value.emit(value);
  };

  private valueEntero = (entero: string) => {
    for (let index = 1; index <= +entero; index++) {
      this.data.push('star');
    }
  };
  private valueDecimal = (decimal: string) => {
    let star;
    const value = +decimal;
    if (value > 0) {
      if (value > 3 && value < 7){
        star = 'star-half';
      }
      else if (value < 3) {
        star = 'star-outline';
      } else {
        star = 'star';
      }
      this.data.push(star);
    }
  };

  private valueFinal = (entero: string) => {
    const value = 5 - (+entero);
    for (let index = 1; index <= value; index++) {
      this.data.push('star-outline');
    }
  };
}
