import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Industry, InitialIndustry } from 'src/app/interfaces/industry';
import { IndustryApiService } from 'src/app/services/industry-api.service';

@Component({
  selector: 'app-industry-manager',
  templateUrl: './industry-manager.component.html',
  styleUrls: ['./industry-manager.component.scss']
})
export class IndustryManagerComponent implements OnInit {

  isAddMode: boolean = true;
  industry: Industry = InitialIndustry;

  get validateForm(): string{
    var res: string[] = [];

    if(this.industry.name == ""){
      res.push("The name is required");
    }
    
    return res.join(", ");
  }

  constructor(
    public industryApi: IndustryApiService,
    public actRoute: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit(): void {
    let id = this.actRoute.snapshot.params['id'];
    this.isAddMode = !id;

    if(!this.isAddMode){
      this.industryApi.getIndustry(id).subscribe((data) => {
        this.industry = data;
      });
    }
  }

  onSave(){
    if(this.validateForm){
      return;
    }

    console.log("onSave", this.industry);
    if(this.isAddMode){
      this.industryApi.addIndustry(this.industry).subscribe(() => {
        this.router.navigate(['/industries']);
      });
    }else{
      this.industryApi.updateIndustry(this.industry).subscribe(() => {
        this.router.navigate(['/industries']);
      });
    }
  }
}
