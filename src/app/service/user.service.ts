import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../model/user";
const API_URL = "http://localhost:8080/user"
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient : HttpClient) { }
  //get all user - get mapping
  getAllUser() : Observable<User[]> {
    return this.httpClient.get<User[]> (API_URL)
  }
  // get a user - get mapping
  getUserById(id : any) : Observable<User>{
    return this.httpClient.get<User> (API_URL + '/' + id)
  }
  // delete a user by id - delete mapping
  deleteById(id : any) : Observable<User>{
    return this.httpClient.delete(API_URL + "/delete/" + id)
  }
  // create a user - post mapping
  createUser(user : User)  : Observable<any> {
    return this.httpClient.post(API_URL + '/create' , user)
  }
  // edit a user - put mapping
  editUser(user : User, id : any) : Observable<any>{
    return this.httpClient.put(API_URL + '/edit/' + id, user)
  }
  login(user : User) : Observable<any>{
    return this.httpClient.post(API_URL + '/login', user)
  }
}
