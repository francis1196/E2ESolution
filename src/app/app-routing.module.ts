import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndustriesComponent } from './pages/industries/industries.component';
import { IndustryManagerComponent } from './pages/industry-manager/industry-manager.component';
import { WarehouseComponent } from './pages/warehouse/warehouse.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'industries' },
  { path: 'industries', component: IndustriesComponent },
  { path: 'add-industry', component: IndustryManagerComponent },
  { path: 'edit-industry/:id', component: IndustryManagerComponent },
  { path: 'warehouse', component: WarehouseComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
