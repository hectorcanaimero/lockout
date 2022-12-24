import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

  @Component({
  selector: 'app-paid',
  templateUrl: 'paid.page.html',
  styleUrls: ['paid.page.scss'],
  providers: [DatePipe]
})
export class PaidPage implements OnInit {
    ngOnInit(): void {
    }

}
