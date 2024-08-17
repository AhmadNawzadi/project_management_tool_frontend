import { Component, OnInit, Input } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { CommonModule } from '@angular/common';
import { TaskService } from '../services/task.service';
import { MemberService } from '../services/member.service';
import { NewProjectComponent } from "../new-project/new-project.component";
import { AuthService } from '../services/auth.service';
import { SharedDataService } from '../services/shared-data.service';
import { NewTaskComponent } from "../new-task/new-task.component";
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { MemberComponent } from "../member/member.component";
import { FormsModule } from '@angular/forms';
import { UpdateTaskComponent } from "../update-task/update-task.component";
import { Task } from '../models/task';


@Component({
  selector: 'app-project',
  standalone: true,
  imports: [
    CommonModule,
    NewProjectComponent,
    NewTaskComponent,
    RouterOutlet,
    RouterModule,
    MemberComponent,
    FormsModule,
    UpdateTaskComponent
],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss',
  providers: [
    ProjectService,
    TaskService,
    MemberService,
    AuthService,
    Router
    ]
})
export class ProjectComponent implements OnInit {

  constructor(
    private projectService : ProjectService, 
    private taskService : TaskService,
    private memberService : MemberService,
    private sharedDataService : SharedDataService,
    private router :Router) {}

  projects : any[]=[] 
  tasks : any[]=[] 
  @Input() members : any[]=[] 
  uId : number = 0

  task : Task = {
    name: '',
    description: '',
    dueDate: new Date(),
    priority: '',
    status: ''
  }

  taskDone : number = 0
  taskTodo : number = 0
  taskInProgress : number = 0

  showProjects : boolean = true 
  showTasks : boolean =  false 
  showMembers : boolean = false
  showNewProjectForm : boolean = false
  showNewTaskForm : boolean = false
  showAssignTask : boolean = false
  showUpdateTask : boolean = false

  pId : any
  inviteId : any

  selectedMemberId : any
  taskId : any
  assignedTo :any

  ngOnInit(): void {
    this.getUserId();
  }

  getUserId() {
    this.sharedDataService.userId$.subscribe(userId => {
      if (userId) {
        this.uId = userId
        this.getProjects(this.uId);
      } else {
      }
    });
  }

  getProjects(userId : number){
    this.projectService.getData(userId).subscribe({
      next: (data: any[]) => {
        this.projects = data;
      },
      error: (error) => {
        console.error('Error fetching data', error);
      }
    });
  }

  getTasks(projectId : number) {
    console.log("get tasks")
    this.taskService.getData(projectId).subscribe({
      next: (data: any[]) => {
        this.tasks = data;
        this.pId = projectId
        this.countTasksByStatus();
        this.tasks.forEach(task => this.getAssignment(task.id));
      },
      error: (error) => {
        console.error('Error fetching data', error);
      }
    });
    this.showProjects = false
    this.showTasks = true
  }

  getMembers(projectId : number){
    this.memberService.getMembersByProjectId(projectId).subscribe({
      next: (data: any[]) => {
        this.members = data;
        this.pId = projectId
        this.sharedDataService.setProjectId(projectId);
        console.log(data)
 
      },
      error: (error) => {
        console.error('Error fetching data', error);
      }
    });
    this.showMembers = true 
  }

  getTaskById(taskId : number){
    this.taskService.getTaskById(taskId).subscribe({
      next: (data: any) => {
        this.task.name = data.name;
        this.task.description = data.description;
        this.task.dueDate = data.dueDate;
        this.task.priority = data.priority;
        this.task.status = data.status;
        this.taskId = taskId

        this.showUpdateTask = true;
      },
      error: (error) => {
        console.error('Error fetching data', error);
      }
    })
  }
  exitUpateTask(){
    this.showUpdateTask = false;
  }
  updateTaskClicked(taskId : number){
    this.getTaskById(taskId);
  }
  assigTaskClicked(taskId : number){
    this.taskId = taskId
    this.showAssignTask = true
    this.getMembers(this.pId)
  }
  exitAssignTask(){
    this.showAssignTask = false
  }
  assignTask(memberId : number){
    this.taskService.assignTask(this.taskId, memberId)
    .subscribe({
      next: (response) => {
        console.log('Task assigned successfully', response);
        alert("Tâche attribuée avec succès")
        //this.getAssignment();
      },
      error: (err) => {
        console.error('Error updating assignment', err);
      }
    });
  }

  getAssignment(taskId : number){
    this.taskService.getAssignmentByTaskId(taskId).subscribe({
      next: (data:any) => {
        this.assignedTo = data;
        console.log("ASSIGNMENT ", this.assignedTo)
      },
      error: (err) => {
        console.error('Error getting assignment', err);
      }
    })
  }

  countTasksByStatus(){
    let todo = 0
    let inProgress = 0
    let done = 0
    console.log("TASK LENGTH : ", this.tasks.length)
    this.tasks.forEach(task => {
      if(task.status == 'TODO'){
        todo += 1;
        this.taskTodo = todo
      }
      if(task.status == 'IN_PROGRESS'){
        inProgress += 1;
        this.taskInProgress = inProgress
      }
      if(task.status == 'DONE'){
        done += 1;
        this.taskDone = done
      }   
      else{}
    })
  }

  exitMembers(){
    this.showMembers = false
  }

  backToProjects(){
    this.showProjects = true
    this.showTasks = false
  }

  newTaskClicked(){
    this.showNewTaskForm = true
  }

  newProjectClicked(){
    this.showNewProjectForm = true
  }

  exitNewProjectForm(){
    this.showNewProjectForm = false;
  }

  exitTaskForm(){
    this.showNewTaskForm = false;
  }

  

}
