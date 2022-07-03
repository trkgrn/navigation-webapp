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



  login(user: User): Observable<object> {
    console.log(user)
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(user.username + ':' + user.password) });
    return this.http.get("http://localhost:8080/",{headers,responseType: 'text' as 'json'})
  }



}
