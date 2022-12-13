import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-menu-widget',
  templateUrl: './side-menu-widget.component.html',
  styleUrls: ['./side-menu-widget.component.scss'],
})
export class SideMenuWidgetComponent implements OnInit {

  status = true;
  link = [
    {name: 'Profile'},
    {name: 'Company'},
    {name: 'Messages'},
    {name: 'Membership'},
    {name: 'Logout'},
  ];

  subLink = [
    {name: 'Help Center'},
    {name: 'Privacy Policy'},
    {name: 'Term of Use'},
    {name: 'About Meka'},
    {name: 'Rating App'},
  ];
  constructor() { }

  ngOnInit() {}

}
