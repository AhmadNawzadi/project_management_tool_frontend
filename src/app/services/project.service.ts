import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../models/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = 'http://localhost:8080/project';
  revieved_data : any
  userId : any
  constructor(private httpClient : HttpClient) { }

  getData(userId : number): Observable<any[]> {
    return this.httpClient.get<any[]>(this.apiUrl + '/user/' + userId);
  }

  createProject(project : Project): Observable<any[]> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.httpClient.post<any>(this.apiUrl, project, httpOptions);
  }


}
