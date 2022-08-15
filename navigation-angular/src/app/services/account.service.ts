import {Injectable} from '@angular/core';
import {User} from '../login/user';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  username: string | undefined;
  password: string | undefined;
  rootURL: string = environment.rootUrl
  constructor(private http: HttpClient,private router:Router) {
  }
  loggedIn = false;
  private header: HttpHeaders | undefined;



  signout() {
    localStorage.removeItem('username');
    localStorage.removeItem('token');

    this.router.navigateByUrl('login');
  }

  isUserSignedin() {
    return localStorage.getItem('token') !== null;
  }

  getSignedinUser() {
    return localStorage.getItem('username') as string;
  }

  getToken() {
    let token = localStorage.getItem('token') as string;
    return token;
  }

  getRole(){
    let role = localStorage.getItem("role") as string;
    return role;
  }

   roleMatch(allowedRoles:any) {
    let isMatch = false;
    const userRole = this.getRole()

    if (userRole != null && userRole) {

        for (let j = 0; j < allowedRoles.length; j++) {
          if (userRole == allowedRoles[j]) {
            isMatch = true;
            return isMatch;
          } else {
            continue;
          }
        }

    }
    return isMatch
  }



  login(user: User): Observable<object> {
    return this.http.post<any>(this.rootURL + 'login', user, {headers: new HttpHeaders({ 'Content-Type': 'application/json' })}).pipe(map((resp) => {
      if (typeof user.username === "string") {
        localStorage.setItem('username', user.username);
        localStorage.setItem('role',resp.role.name);
        console.log(resp.role.name)
      }
      localStorage.setItem('token',  resp.token);
      return resp;
    }));
  }

  register(user:User){
    return  this.http.post<User>(this.rootURL + "register",user);

  }

  getUser(name:string){
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.getToken() })
    return  this.http.get(this.rootURL + "getUser?username="+name,{headers});
  }

  getAllUser() {
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.getToken() })
    return  this.http.get(this.rootURL + "getAllUser",{headers});
  }

  getAllRoles(){
    return  this.http.get(this.rootURL + "getAllRoles");
  }









}
