import {Injectable} from '@angular/core';
import {User} from '../login/user';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  username: string | undefined;
  password: string | undefined;

  constructor(private http: HttpClient) {
  }


  private header: HttpHeaders | undefined;


  login(user: User): Observable<object> {
    console.log(user)
    this.header = new HttpHeaders({ Authorization: 'Basic ' + btoa(user.username + ':' + user.password) });
    const headers = this.header
    return this.http.get("http://localhost:8080/",{headers,responseType: 'text' as 'json'})
  }

  register(user:User){
    let headers: HttpHeaders;
    headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa('admin:123')
    });
    return this.http.post<User>('http://localhost:8080/add',user)

  }

  getAllUser() {
    const headers = this.header
    return  this.http.get("http://localhost:8080/getAllUser",{headers});
  }




}
