import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  links = [
    {path: "/industries", name: "Industries"},
    {path: "/warehouse", name: "Warehouse"},
  ];
  
  get url():string{
    return this.router.url;
  }

  constructor(private router: Router) { }

  ngOnInit(): void { }

}
