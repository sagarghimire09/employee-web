import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from '../model/employee';
import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employeeList: Employee[] = [];
  employeeForm: FormGroup;
  editMode: boolean = false;
  deleteMode: boolean = false;

  constructor(private employeeService: EmployeeService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
    this.getAllEmployees();
  }

  getAllEmployees() {
    this.employeeService.getAllEmployees().subscribe(
      (response: Employee[]) => {
        this.employeeList = response;
      }
    )
  }

  initializeForm() {
    this.employeeForm = this.fb.group({
      id: [null, null],
      name: [null, Validators.required],
      email: [null, Validators.required],
      phone: [null, null],
      jobTitle: [null, Validators.required],
      imageUrl: [null, null]
    });
  }

  handleAddEmployee(): void {
    if(this.employeeForm.valid){
      const employee = this.getEmployee();
      this.employeeService.addEmployee(employee).subscribe(
        (response: Employee) => {
          this.employeeForm.reset();
          this.getAllEmployees();
        }
      )
    }
  }

  getEmployee(): Employee {
    return {
      id: this.employeeForm.controls.id?.value,
      name: this.employeeForm.controls.name.value,
      email: this.employeeForm.controls.email.value,
      phone: this.employeeForm.controls.phone.value,
      jobTitle: this.employeeForm.controls.jobTitle.value,
      imageUrl: this.employeeForm.controls.imageUrl.value
    }
  }

  populateEditModal(employee: Employee): void {
    this.editMode = true;

    this.employeeForm.controls.id.setValue(employee.id);
    this.employeeForm.controls.name.setValue(employee.name);
    this.employeeForm.controls.email.setValue(employee.email);
    this.employeeForm.controls.phone.setValue(employee.phone);
    this.employeeForm.controls.jobTitle.setValue(employee.jobTitle);
    this.employeeForm.controls.imageUrl.setValue(employee.imageUrl);
  }

  openDeleteModal(): void {
    this.deleteMode = true;
  }

}
