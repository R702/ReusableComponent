import {Component, OnInit, ViewChild, Input} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource, MatTable} from '@angular/material/table';
import {MatPaginator} from  '@angular/material/paginator';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';
import { FormControl } from '@angular/forms';
import {symbolList} from '../../common/dataElement';
import * as constant  from '../../common/constant';
// import {dataElement} from '../../common/dataElement';
import * as dataElement from '../../common/dataElement'; 
import * as orderEnum from '../../common/enum';
// import { ConsoleReporter } from 'jasmine';/

export interface PeriodicElement {
studentID1:number;
fname1:string;
Date1:Date;
symbol1:[];
}
@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {
  @Input() tableData;
  @Input() columnHeader;
  displayColumns: string[];
  isFilteredOP = false;
  objectKeys = Object.keys;
  filter:String;  
  studentID1:any;
  resultsLength = 0;
  length = 100;
  pageSize: any = [];
  pageSizeOptions = [5, 10, 25, 50, 100];
  private paginator: MatPaginator;
  private sort: MatSort;
  dataSource;

  statusId = constant.All;
  selection : any;
  search: any;
  statusList: dataElement.filter[];

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }
  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }
  setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  constructor(){

  }

  studentIdFilter =  new FormControl();
  firstNameFilter = new FormControl();
  DateFilter = new FormControl();
  symbolFilter = new FormControl();

  globalFilter = '';

  filteredValues = {
    studentID1: '', fname1: '',  Date1: '', symbol1: ''};
  ngOnInit() {

    this.displayColumns = this.objectKeys(this.columnHeader);
    console.log(this.displayColumns);


    this.statusList = dataElement.symbolList;
    this.dataSource = new MatTableDataSource(this.tableData);
    this.dataSource.sort = this.sort;
    this.studentID1 = this.tableData[0].studentID1;


    this.symbolFilter.valueChanges.subscribe((symbolFilterValue) => {
      this.filteredValues['symbol1'] = symbolFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });


    this.DateFilter.valueChanges.subscribe((DateFilterValue) => {
      this.filteredValues['Date1'] = DateFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });
    this.firstNameFilter.valueChanges.subscribe((firstNameFilterValue) => {
      this.filteredValues['fname1'] = firstNameFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });

    this.studentIdFilter.valueChanges.subscribe((studentIdFilterValue) => {
      this.filteredValues['studentID1'] = studentIdFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });
    this.dataSource.filterPredicate = this.customFilterPredicate();
  }

  applyFilter(filter) {
    this.globalFilter = filter;
    this.dataSource.filter = JSON.stringify(this.filteredValues);
  }

  clearFilter(){
    this.DateFilter.setValue('');
    this.symbolFilter.setValue('');
    this.firstNameFilter.setValue('');
    this.studentIdFilter.setValue('');
    this.statusId = constant.All;
  }
  statusFilterChanged(status: string) {
    if (status == orderEnum.Status.H)
      this.symbolFilter.setValue(orderEnum.Status.H);
      else if(status == orderEnum.Status.He)
          this.symbolFilter.setValue(orderEnum.Status.He);
    else
      this.symbolFilter.setValue(constant.All);
  }


  
  customFilterPredicate() {
    const myFilterPredicate = (data: PeriodicElement, filter: string): boolean => {
      var globalMatch = !this.globalFilter;

      if (this.globalFilter) {
        // search all text fields
        globalMatch = data.studentID1.toString().trim().toLowerCase().indexOf(this.globalFilter.toLowerCase()) !== -1;
        globalMatch = data.fname1.toString().trim().toLowerCase().indexOf(this.globalFilter.toLowerCase()) !== -1;
        globalMatch = data.Date1.toString().trim().toLowerCase().indexOf(this.globalFilter.toLowerCase()) !== -1;
        globalMatch = data.symbol1.toString().trim().toLowerCase().indexOf(this.globalFilter.toLowerCase()) !== -1;
      }

      if (!globalMatch) {
        return null;
      }

      let searchString = JSON.parse(filter);
      
      return data.studentID1.toString().trim().indexOf(searchString.studentID1) !== -1 &&
        data.fname1.toString().trim().indexOf(searchString.fname1.toLowerCase()) !== -1 &&
        data.Date1.toString().trim().toLowerCase().indexOf(searchString.Date1.toLowerCase()) !== -1 &&
        data.symbol1.toString().trim().toLowerCase().indexOf(searchString.symbol1.toLowerCase()) !== -1 

    }
    return myFilterPredicate;
  }

  createFilter(): (data: any, filter: string) => boolean {
    let filterFunction = (data, filter) => this.filterOfferingData(data, filter)
    return filterFunction;
  }
  isStatusFilterMatch(data: any, searchTerms: any) {
    let isStatusExist: boolean;
    if (searchTerms.status !== "") {
      if (searchTerms.status.toLowerCase() == constant.All.toLowerCase()) {
        isStatusExist = true;
      }
      else if (data.status.toLowerCase() == orderEnum.Status.H.toLowerCase()) {
        isStatusExist = orderEnum.Status.H.toLowerCase() === searchTerms.status.toLowerCase();
      } else if (data.status.toLowerCase() == orderEnum.Status.He.toLowerCase()) {
        isStatusExist = orderEnum.Status.He.toLowerCase() === searchTerms.status.toLowerCase();
      }
      else {
        isStatusExist = false;
      }
    }
    else isStatusExist = true;
    return isStatusExist;
  }
  dobDateChanged(event: MatDatepickerInputEvent<Date>) {
    if (event.value == null)
      this.DateFilter.setValue('');
  }
  changeDobDate(event: MatDatepickerInputEvent<Date>) {
    if (event.value == null)
      this.DateFilter.setValue('');
    else
      this.DateFilter.setValue(event.value);
  }
  filterOfferingData(data: any, filter: string): boolean {
    let isRecordMatched = false;
    let searchTerms = JSON.parse(filter);
    let DateFlag: boolean;
     if (searchTerms.Date1!== "" && searchTerms.Date1 !== "" && searchTerms.Date1 !== undefined && searchTerms.Date1 !== null) {
      let searchDOB = new Date(searchTerms.Date1);
      let patientDOB = new Date(data.Date1);
      if (data.Date1 !== undefined && data.Date1 !== null) {
        DateFlag = searchDOB.getFullYear() == patientDOB.getFullYear() && searchDOB.getMonth() == patientDOB.getMonth() && searchDOB.getDate() == patientDOB.getDate()
      }
      else DateFlag = false;
    }
    else DateFlag = true;
    isRecordMatched =
    this.isStatusFilterMatch(data, searchTerms) &&
    data.fname1.toString().toLowerCase().indexOf(searchTerms.fname1.toLowerCase()) !== -1 &&
    data.studentID1.toString().toLowerCase().indexOf(searchTerms.studentID1.toLowerCase()) !== -1 &&
    DateFlag
    if (isRecordMatched) {
      this.isFilteredOP = true;
    } ///flag for filter is applied
    else {
      if (searchTerms.studentID1 == "" || searchTerms.fname1 == "" || searchTerms.symbol1 == "") {
        this.isFilteredOP = true;
      }
    }
    return isRecordMatched;
  }
}