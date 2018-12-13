import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Employee } from './supporting_objects/Employee';
import { EMPLOYEE_DETAILS } from './mock-employees';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private employeesUrl = '/api/employees'; 
  constructor( private http: HttpClient) { }
  
  getEmployeesStatic(): Observable<Employee[]> {
    return of(EMPLOYEE_DETAILS);
  }

  /** GET heroes from the server */
  getAllEmployees (): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.employeesUrl).pipe(
      catchError(this.handleError('getAllEmployees', []))
    );
  }

  insertEmployee(emp : Employee): Observable<Employee> {
    console.log(emp);
    return this.http.post<Employee>(this.employeesUrl, emp, httpOptions).
      pipe(tap((emp: Employee) => console.log(`added Employee w/ name=${emp.name}`)), 
      catchError(this.handleError<Employee>('insertEmployee')));
  }


  deleteEmployee(empID :String) : Observable<Employee> {
    return this.http.delete<Employee>(this.employeesUrl + '/' +  empID, httpOptions);
  }

  updateEmployee(emp: Employee) : Observable<void> {
    return this.http.put<void>(this.employeesUrl + '/' + emp.id, emp);
  }
 

 /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T> (operation = 'operation', result?: T) {  
  return (error: any): Observable<T> => {
 
    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead
  
    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}
}
