import { Component, OnInit } from '@angular/core';
import {UserService} from "../../service/user.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../model/user";

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {
  users? : User[];
  user? : User;
  userForm! : FormGroup;

  constructor(private userService : UserService,
              private formGroup : FormBuilder) { }

  ngOnInit(): void {
    this.userForm = this.formGroup.group({
      id: ['', Validators.required],
      username : ['', Validators.required],
      password: ['', Validators.required],
      email : ['', Validators.required, Validators.email]
    });
    this.getAllUsers();
    console.log(this.userForm.value)
  }
  getAllUsers(){
    this.userService.getAllUser().subscribe((data) => this.users = data);
    console.log(this.userService.getAllUser());
    // @ts-ignore
    document.getElementById('tittle').innerText = 'create user';
    // @ts-ignore
    document.getElementById('submit').innerText = 'Create'
  }
  getAUser(id : any){
    this.userService.getUserById(id).subscribe((data) => {
      this.users = [];
      this.users.push(data)
    });
  }
  createUser(){
    const user = {
      id : this.userForm.value.id,
      username : this.userForm.value.username,
      password : this.userForm.value.password,
      email : this.userForm.value.email
    };
    console.log(user)
    this.userService.createUser(user).subscribe( () => {
      alert('Created');
      this.userForm.reset();
      this.getAllUsers()
    })
  }
  editUser(id : any){
    this.userService.getUserById(id).subscribe( data => this.userForm?.patchValue(data));
    // @ts-ignore
    document.getElementById('tittle').innerText = 'update user';
    // @ts-ignore
    document.getElementById('submit').innerText = 'Update';
  }
  deleteUser(id : any){
    if(confirm('Delete user by id: '  + id + '?')){
      this.userService.deleteById(id).subscribe(() => {
        alert('Delete Success');
        this.getAllUsers();
      })
    }
  }
}
