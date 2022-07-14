import {Injectable} from '@angular/core';
import {User} from '../login/user';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  username: string | undefined;
  password: string | undefined;

  constructor(private http: HttpClient,private router:Router) {
  }
  loggedIn = false;
  private header: HttpHeaders | undefined;


  login(user: User): Observable<object> {
    console.log(user)
    this.loggedIn = true;
    if (typeof user.username === "string") {
      localStorage.setItem("isLogged", user.username);
    }
    this.header = new HttpHeaders({ Authorization: 'Basic ' + btoa(user.username + ':' + user.password) });
    const headers = this.header
    return this.http.get("http://localhost:8080/",{headers,responseType: 'text' as 'json'})
  }

  register(user:User){
    let username = 'user'
    let password = '321'
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return  this.http.post<User>("http://localhost:8080/register",user,{headers});

  }

  getUser(name:string){
    const headers  = this.header
    return  this.http.get("http://localhost:8080/getUser?username="+name,{headers});
  }

  getAllUser() {
    const headers = this.header
    return  this.http.get("http://localhost:8080/getAllUser",{headers});
  }



  isLoggedIn()
  {

    return this.loggedIn;
  }

  logOut()
  {
    localStorage.removeItem("isLogged");
    localStorage.removeItem("userId")
    localStorage.removeItem("username")
    this.loggedIn = false;
    this.router.navigate(["/login"]);


  }




}
