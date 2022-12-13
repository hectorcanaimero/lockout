import { Component } from '@angular/core';


@Component({
  selector: 'app-widget-skeleton',
  template: `
    <ion-item class="item-skeleton">
      <ion-thumbnail slot="start">
        <ion-skeleton-text [animated]="true"></ion-skeleton-text>
      </ion-thumbnail>
      <ion-label>
        <h3>
          <ion-skeleton-text [animated]="true" style="width: 80%;"></ion-skeleton-text>
        </h3>
        <p>
          <ion-skeleton-text [animated]="true" style="width: 60%;"></ion-skeleton-text>
        </p>
        <p>
          <ion-skeleton-text [animated]="true" style="width: 30%;"></ion-skeleton-text>
        </p>
      </ion-label>
    </ion-item>
  `,
})

export class SkeletonWidgetComponent { }
