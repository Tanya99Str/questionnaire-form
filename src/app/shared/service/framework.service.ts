import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {FrameworkDto} from '../dto/framework.dto';
import {catchError} from 'rxjs/operators';
import {FrameworkVersionDto} from '../dto/frameworkVersion.dto';

@Injectable({providedIn: 'root'})

export class FrameworkService {

  SERVER_URL: string = 'http://localhost:8080/api/';

  constructor(private _http: HttpClient) {
  }

  getAllFrameworks(): Observable<FrameworkDto[]> {
    return this._http.get<FrameworkDto[]>(this.SERVER_URL + 'frameworks')
      .pipe((catchError(err => throwError(err))));
  }

  getOneFrameworkById(id: number): Observable<FrameworkDto> {
    return this._http.get<FrameworkDto>(`${this.SERVER_URL + 'frameworks'}/${id}`)
      .pipe((catchError(err => throwError(err))));
  }

}
