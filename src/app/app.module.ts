import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndustriesComponent } from './pages/industries/industries.component';
import { HttpClientModule } from '@angular/common/http';
import { PaginationComponent } from './components/pagination/pagination.component';
import { FilterComponent } from './components/filter/filter.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    IndustriesComponent,
    PaginationComponent,
    FilterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
