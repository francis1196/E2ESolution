import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndustriesComponent } from './pages/industries/industries.component';
import { WarehouseComponent } from './pages/warehouse/warehouse.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'industries' },
  { path: 'industries', component: IndustriesComponent },
  { path: 'warehouse', component: WarehouseComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
