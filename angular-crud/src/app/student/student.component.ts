import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Student } from '../models/student';
import { HttpDataService } from '../services/http-data.service';
import * as _ from 'lodash';
@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  @ViewChild('studentForm', {static: false})
  studentForm!: NgForm

  studentData!: Student
  dataSource = new MatTableDataSource()
  displayedColumns: string[] = ['id', 'name', 'age','mobile','email','address', 'actions']
  @ViewChild(MatPaginator, {static: false})
  paginator!: MatPaginator
  isEditMode = false


  constructor(private httpDataService: HttpDataService) {
    this.studentData = {} as Student
   }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator
    this.getAllStudents()
  }
  getAllStudents(){
    this.httpDataService.getList().subscribe((response: any) => {
      this.dataSource.data = response
    })
  }

  editItem(element: any){
    this.studentData = _.cloneDeep(element)
    this.isEditMode = true
  }
  cancelEdit(){
    this.isEditMode = false
    this.studentForm.resetForm()
  }
  deleteItem(id: string){
    this.httpDataService.deleteItem(id).subscribe((response: any) => {
      this.dataSource.data = this.dataSource.data.filter((o:any) => {
        return o.id !== id ? o :false
      })
    })
  }
}
