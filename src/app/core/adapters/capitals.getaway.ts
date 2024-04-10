import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root',
})
export class CapitalsGetaway {
  constructor(private http: HttpClient) {}

  getCapitals(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/api/cities').pipe();
  }

  deleteCapital(capital: any): Observable<any> {
    console.log(capital);
    return this.http
      .delete<any>(
        `http://localhost:3000/api/citiesDelete/${capital.id}`,
        httpOptions
      )
      .pipe();
  }

  getOneCapital(id: number): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/api/cities/${id}`).pipe();
  }

  updateCapital(capital: any): Observable<any> {
    const url = `http://localhost:3000/api/citiesUpdate/${capital.id}`;
    return this.http.put(url, capital, httpOptions).pipe();
  }

  addCapital(capital: any): Observable<any> {
    console.log(capital);
    return this.http
      .post<any>('http://localhost:3000/api/citiesCreate', capital, httpOptions)
      .pipe();
  }
}
