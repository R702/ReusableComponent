import { ArrayType } from '@angular/compiler';
import { Component, OnInit} from '@angular/core';;

export interface PeriodicElement {
  studentID1:number;
  fname1:string;
  Date1:Date;
  symbol1:any[];
  }


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {


  constructor() { }

  ngOnInit() {
  }
  
  
   columnHeader1 = {'studentID1': 1, 'fname1': 'First Name 1', 'Date1': new Date(), 'symbol1': []};
   

   tableData1: PeriodicElement[] = [
    {studentID1: 1, fname1: 'hydrogen', Date1: new Date('2021-05-24T18:30:42.168Z') , symbol1: ['H']},
    {studentID1: 2, fname1: 'helium', Date1: new Date('2021-05-25T18:30:42.168Z'), symbol1: ['He']},
    {studentID1: 3, fname1: 'lithium', Date1:new Date('2021-05-22T18:30:42.168Z'), symbol1: ['Li']},
    {studentID1: 4, fname1: 'beryllium', Date1: new Date('2021-05-22T18:30:42.168Z'), symbol1: ['Be']},
    {studentID1: 5, fname1: 'boron', Date1: new Date ('2021-04-24T18:30:42.168Z'), symbol1: ['B']},
    {studentID1: 6, fname1: 'carbon', Date1: new Date('2021-03-24T18:30:42.168Z'), symbol1: ['C']},
    {studentID1: 7, fname1: 'nitrogen', Date1: new Date('2021-02-24T18:30:42.168Z'), symbol1: ['N']},
    {studentID1: 8, fname1: 'oxygen', Date1: new Date('2021-11-24T18:30:42.168Z'), symbol1: ['O']},
    {studentID1: 9, fname1: 'fluorine', Date1: new Date('2021-06-21T18:30:42.168Z'), symbol1: ['Fe']},
    {studentID1: 10, fname1: 'neon', Date1: new Date('2021-12-22T18:30:42.168Z'), symbol1: ['Ne']},
  ];



}