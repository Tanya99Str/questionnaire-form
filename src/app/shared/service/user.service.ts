import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {FrameworkDto} from '../dto/framework.dto';
import {catchError, tap} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {UserDto} from '../dto/user.dto';

@Injectable({providedIn: 'root'})

export class UserService {

  SERVER_URL: string = 'http://localhost:8080/api/';

  constructor(private _http: HttpClient) {
  }

  getAllUsers(): Observable<UserDto[]> {
    return this._http.get<UserDto[]>(this.SERVER_URL + 'users')
      .pipe((catchError(err => throwError(err))));
  }

  saveUser(user: UserDto): Observable<UserDto[]> {
    return this._http.post<UserDto[]>(this.SERVER_URL+ 'users', user)
      .pipe(catchError(err => throwError(err)));
  }

}
