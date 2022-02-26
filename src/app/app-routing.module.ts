import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndustriesComponent } from './pages/industries/industries.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'industries' },
  { path: 'industries', component: IndustriesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
