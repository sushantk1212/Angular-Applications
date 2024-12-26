import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class MarvellousService {

  constructor(private http: HttpClient) { }

  getBatches() {
    return this.http.get('http://localhost:5100/getBatches');
  }

  addCourse(course: any): Observable<any> {
    return this.http.post<any>('http://localhost:5100/addBatches',course);
  }

}