import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndustriesComponent } from './pages/industries/industries.component';
import { HttpClientModule } from '@angular/common/http';
import { PaginationComponent } from './components/pagination/pagination.component';
import { FilterComponent } from './components/filter/filter.component';
import { FormsModule } from '@angular/forms';
import { WarehouseComponent } from './pages/warehouse/warehouse.component';
import { IndustryManagerComponent } from './pages/industry-manager/industry-manager.component';
import { DeviceManagerComponent } from './pages/device-manager/device-manager.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DevicesComponent } from './components/devices/devices.component';
import { IndustryComponent } from './pages/industry/industry.component';

@NgModule({
  declarations: [
    AppComponent,
    IndustriesComponent,
    PaginationComponent,
    FilterComponent,
    WarehouseComponent,
    IndustryManagerComponent,
    DeviceManagerComponent,
    SidebarComponent,
    DevicesComponent,
    IndustryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
