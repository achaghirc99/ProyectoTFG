import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { User } from '../models/user';
import {tap} from 'rxjs/operators';
import { JwtResponseInterface } from '../models/jwt-response-interface';

@Injectable({
  providedIn: 'root'
})
export class UserAuthenticateService {

  private token : string;
  users: User[];
  selectedUser: User;

  readonly URL_API_USER = 'http://localhost:3000/api/user';

  constructor(private http: HttpClient) {
    this.selectedUser = new User();
  };

  onLogin(user:User){
    return this.http.post(this.URL_API_USER+'/signin',user).pipe(tap((res:JwtResponseInterface) => {
      if(res) {
        this.saveToken(res.dataUser.accessToken, res.dataUser.expiresIn);
      }
    })
    );
  };

  public postAuthenticateUser(user:User) {
    return this.http.post(this.URL_API_USER + '/signup',user);
  };

  public putAuthenticatedUser(user: User ) {
    return this.http.put(this.URL_API_USER +`/${user._id}`,user);
  }

  public getAllAuthenticatedUsers(){
    return this.http.get(this.URL_API_USER);
  };

  public getUserByEmail(email: String) {
    return this.http.get(this.URL_API_USER+`/byEmail/${email}`).pipe(tap((res:User) => {}));
  }

  public deleteUser(_id:string){
    return this.http.delete(this.URL_API_USER + `/${_id}`);
  };

  private saveToken(token:string, expiresIn:string): void {
    localStorage.setItem("ACCESS_TOKEN", token);
    localStorage.setItem("EXPIRES_IN", expiresIn);
    this.token = token;
  }

  getOneUser() {
    const id = localStorage.getItem('id');
    return this.http.get(this.URL_API_USER+`/${id}`);
  }

  loggedIn() { 
    return !!localStorage.getItem('token');
  }
  
  logout() {
    this.token = '';
    localStorage.removeItem('token');
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("EXPIRES_IN");
    localStorage.removeItem("id");
  }

  private getToken() : string {
    if(!this.token){
      this.token = localStorage.getItem("ACCESS_TOKEN");
    }
    return this.token;
  }

}
