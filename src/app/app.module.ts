import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from "@angular/material/table";
// import {DataPropertyGetterPipe} from './table/data-property-getter-pipe/data-property-getter.pipe';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
// import {CustomersComponent} from './customers-table/customers.component';
import {MatTabsModule} from "@angular/material/tabs";
import { MatSliderModule } from '@angular/material/slider';
import { EmployeeComponent } from './employee/employee.component';
import { DataTableComponent } from './Shared/data-table/data-table.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
// import {
//   MatSelectModule, MatListModule,
//   MatDividerModule, MatCheckboxModule, MatAutocompleteModule, MatRadioModule,
//   MatStepperModule,  MatSlideToggleModule} from '@angular/material';
// import {MatMomentDateModule} from '@angular/material/datepicker'
import { ProgressSpinnerMode} from '@angular/material/progress-spinner';
import {MatSelectModule} from '@angular/material/select';
import { DatePipe } from '@angular/common';
import { TitleCasePipe } from '@angular/common';
@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    DataTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
      MatTableModule,
      MatFormFieldModule,
      MatInputModule,
      MatPaginatorModule,
      MatSortModule,
      MatIconModule,
      MatButtonModule,
      MatTabsModule,
      MatSliderModule,
      MatDatepickerModule,
      MatNativeDateModule,FormsModule, ReactiveFormsModule,MatSelectModule
      // MatMomentDateModule
  ],
  providers: [DatePipe, TitleCasePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
