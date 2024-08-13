import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SharedDataService } from './shared-data.service';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  private apiUrl = 'http://localhost:8080/members'
  revieved_data : any
  constructor(private httpClient : HttpClient, private sharedDataService : SharedDataService) { }
  projectId : any
  project : any


  updateRole(memberId: number, projectId: number, role: string): Observable<any> {
    const url = `${this.apiUrl}/${memberId}/${projectId}/${role}`;
    return this.httpClient.patch(url, {});
}

  getMembersByProjectId(projectId : number): Observable<any[]> {
    return this.httpClient.get<any[]>(this.apiUrl + '/' + projectId);
  }

  inviteMember(email: string, projectId: number): Observable<any> {
    const url = `http://localhost:8080/invitation?to=${email}&projectId=${projectId}`;
    return this.httpClient.post(url, {}) 
  }

  getProjectById(projectId : number) :  Observable<any> {
    const url = 'http://localhost:8080/project';
    return this.httpClient.get<any>(url + '/' + projectId);
  }
 

}
