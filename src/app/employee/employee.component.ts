import { Component, OnInit } from '@angular/core';
import {Employee} from '../supporting_objects/Employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  employeeDetails = new Employee();
    
  allEmployees : Employee[];

  maxDate: Date;

  constructor(private employeeService: EmployeeService) {
    this.maxDate = new Date();
   }

  ngOnInit() {
    
    this.getEmployeeList();
    
  }

  clearTextFieldsOnPageLoad(){
    this.employeeDetails.name = '';
    this.employeeDetails.email = '';
    this.employeeDetails.dateOfBirth = '';
    this.employeeDetails.department = '';
    this.employeeDetails.gender = '';
  }

  getEmployeeList(): void {
    this.employeeService.getAllEmployees()
        .subscribe(employees => {this.allEmployees = employees; this.clearTextFieldsOnPageLoad();});
  }

  addEmployee()  {
    console.log( this.employeeDetails);
    this.setAge();
    this.employeeService.insertEmployee(this.employeeDetails).subscribe(() => this.getEmployeeList());
    console.log(this.allEmployees);
  }

  updateEmployee() {
    this.setAge();
    this.employeeService.updateEmployee(this.employeeDetails).subscribe(() => this.getEmployeeList());
   
  }

  calculateAge(birthday) : number{
    var dateBirth = new Date(birthday);
    var todayDate = Date.now();
    var dateDiff = todayDate - dateBirth.getTime();
    var ageDate = new Date(dateDiff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
 
  setAge(){
    this.employeeDetails.age = this.calculateAge(this.employeeDetails.dateOfBirth);
  }


  editEmployee(employeeToEditDetails){
    console.log('Edit Employee Details  received');
    console.log(employeeToEditDetails);
    
    this.employeeDetails.id = employeeToEditDetails._id;
    this.employeeDetails.name = employeeToEditDetails.name;
    this.employeeDetails.gender = employeeToEditDetails.gender;
    this.employeeDetails.department = employeeToEditDetails.department;
    this.employeeDetails.email = employeeToEditDetails.email;
    this.employeeDetails.dateOfBirth = employeeToEditDetails.dateOfBirth;
    if(employeeToEditDetails.dateOfBirth !== this.employeeDetails.dateOfBirth){
      this.setAge();
    }else{
      this.employeeDetails.age = employeeToEditDetails.age;
    }
   
  }

  deleteEmployee(idEmployeeDetailsToDelete) {
    console.log('Delete Employee Details  received');
    console.log(idEmployeeDetailsToDelete);
    this.employeeService.deleteEmployee(idEmployeeDetailsToDelete).subscribe(() => this.getEmployeeList());
  }

}
