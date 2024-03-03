import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Dream } from '../models/dream';

@Injectable({
  providedIn: 'root'
})
export class DreamService {
  private url = environment.baseUrl + 'api/dreams';

  constructor(private http: HttpClient) { }

  index(): Observable<Dream[]> {
    return this.http.get<Dream[]>(this.url).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(new Error('DreamService.index(): error retrieving dreams: ' + err));
      })
    );
  }
}
