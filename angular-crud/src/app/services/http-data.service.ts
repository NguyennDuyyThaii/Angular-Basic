import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Student } from '../models/student';
import {retry, catchError} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class HttpDataService {
  base_Url = "http://localhost:3000/students"
  constructor(private _http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  handleError(error: HttpErrorResponse){
    if(error.error instanceof ErrorEvent){
      console.log('An error occurred: ', error.error.message)
    }else{
      console.log(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      )
    }
    return throwError('Something bad happennedl please try again later.')
  }

  createItem(item: any):Observable<Student>{
    return this._http.post<Student>(this.base_Url, JSON.stringify(item), this.httpOptions)
    .pipe(retry(2), catchError(this.handleError))
  }
  getList():Observable<Student>{
    return this._http.get<Student>(this.base_Url).pipe(retry(2), catchError(this.handleError))
  }
  getById(id: string):Observable<Student>{
    return this._http.get<Student>(this.base_Url + '/' +id).pipe(retry(2), catchError(this.handleError))
  }
  updateItem(id: string, item: any):Observable<Student>{
    return this._http.put<Student>(this.base_Url + '/' +id, JSON.stringify(item), this.httpOptions)
    .pipe(retry(2), catchError(this.handleError))
  }
  deleteItem(id: string):Observable<Student>{
    return this._http.delete<Student>(this.base_Url + '/' +id, this.httpOptions).pipe(retry(2), catchError(this.handleError))
  }
}

