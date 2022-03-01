import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { faIndustry, faMobileScreenButton } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  faIndustry = faIndustry;
  faMobileScreenButton = faMobileScreenButton;

  links = [
    {path: "/industries", name: "Industries", icon: faIndustry},
    {path: "/warehouse", name: "Warehouse", icon: faMobileScreenButton},
  ];
  
  get url():string{
    return this.router.url;
  }

  constructor(private router: Router) { }

  ngOnInit(): void { }

}
