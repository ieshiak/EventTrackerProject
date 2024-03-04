import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, of, throwError } from 'rxjs';
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

  create(dream: Dream): Observable<Dream> {
    return this.http.post<Dream>(this.url, dream).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError(
           () => new Error( 'DreamService.create(): error creating Dream: ' + err )
        );
      })
    );
  }

  destroy(id: number): Observable<void> {
    const deleteUrl = `${this.url}/${id}`;
    return this.http.delete<void>(deleteUrl).pipe(
      catchError((error: any) => {
        console.error(error);
        return throwError(
           () => new Error( 'DreamService.create(): error creating Dream: ' + error )
        );
      })
    );
  }

  update(dream: Dream): Observable<Dream> {
    const updateUrl = `${this.url}/${dream.id}`;
    return this.http.put<Dream>(updateUrl, dream).pipe(
      catchError((error: any) => {
        console.error(error);
        return throwError(
           () => new Error( 'DreamService.update(): error updating Dream: ' + error )
        );
      })
    );
  }

  show(id: number): Observable<Dream> {
    return this.http.get<Dream>(`${this.url}/${id}`).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError(
           () => new Error( 'DreamService.show(): error showing Dream: ' + err )
        );
      })
    );
  }
}
