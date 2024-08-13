import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl = 'http://localhost:8080/task'
  revieved_data : any
  constructor(private httpClient : HttpClient) { }

  getData(projectId : number): Observable<any[]> {
    return this.httpClient.get<any[]>(this.apiUrl + '?projectId=' + projectId);
  }

  createTask(task : Task, projectId: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.httpClient.post<any>(this.apiUrl + '/' + projectId , task, httpOptions);
  }

  assignTask(taskId : number, pmId : number): Observable<any> {
    const url = `http://localhost:8080/assignment/${taskId}/${pmId}`
    return this.httpClient.post<any>(url, {});
  }

  updateTask(taskId : number, task : Task): Observable<any> {
    const url = `${this.apiUrl}/${taskId}`;
    return this.httpClient.put<any>(url, task);
  }

  getTaskById(taskId : number) : Observable<any>{
    const url = `${this.apiUrl}/${taskId}`;
    return this.httpClient.get<any>(url);

  }
}
