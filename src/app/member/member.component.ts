import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberService } from '../services/member.service';
import { FormsModule } from '@angular/forms';
import { SharedDataService } from '../services/shared-data.service';



@Component({
  selector: 'app-member',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  providers:[
    MemberService,
    SharedDataService
  ],
  templateUrl: './member.component.html',
  styleUrl: './member.component.scss'
})
export class MemberComponent implements OnInit{

  constructor(private memberService : MemberService, private sharedDataService : SharedDataService){}

  ngOnInit(): void {
    //this.getProjectId()  
  }

  @Input() members : any[] = []
  @Output() exit = new EventEmitter();

  email : string = ''
  project : any
  userId : any
  @Input() projectId : any

  inviteMember() {
    this.memberService.inviteMember(this.email, this.projectId)
      .subscribe({
        next: () => console.log("Email sent successfully"),
        error: (error) => console.error('Error sending invite:', error)
      });
      alert("Email sent successfully")
  }

  exitMemebers(){
    this.exit.emit()
  }

  updateRole(memberId: number, role: string): void {
    this.memberService.updateRole(memberId, this.projectId, role)
      .subscribe({
        next: (response) => {
          console.log('Role updated successfully', response);
        },
        error: (err) => {
          console.error('Error updating role', err);
        }
      });
  }

  getProjectById(){
    this.memberService.getProjectById(this.projectId).subscribe({
      next: (data: any) => {
        this.project = data;
        console.error('project', this.project);
        //this.userId = data.user.id
      },
      error: (error) => {
        console.error('Error fetching data', error);
      }
    });
  }

  getProjectId() {
    console.log('get project id:', this.projectId);
    this.sharedDataService.projectId$.subscribe(projectId => {
      if (projectId) {
        this.projectId = projectId
        console.log('PROJECT ID IN MEM COM:', this.projectId);
      } else {
      }
    });
  }



}
