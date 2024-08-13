import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';
import { Project } from '../models/project';
import { ProjectService } from '../services/project.service';
import { SharedDataService } from '../services/shared-data.service';

@Component({
  selector: 'app-new-project',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './new-project.component.html',
  styleUrl: './new-project.component.scss'
})
export class NewProjectComponent implements OnInit{

  @Output() exit = new EventEmitter();
  @Input()  userId? : number 
  user : any

  constructor(
    private projectService : ProjectService, private sharedDataService : SharedDataService) {

      this.sharedDataService.user$.subscribe(user => {
        this.user = user;
      });
  }

  ngOnInit(): void {
   // this.getUserId()
    console.log("USER ID FROM NEW PROJECT", this.userId)
  }

  name : string = ""
  description : string = ""
  startDate : Date = new Date()

  exitNewProject(){
    this.exit.emit();
  }

  getUser() {
    console.log('User ID FINAL 11:');
    this.sharedDataService.user$.subscribe(user => {
      if (user) {
        this.user = user
        console.log('User ID FINAL 22:', user);
      } else {
        // Handle case where userId is not available
      }
    });
  }

  createProject(project : Project){
      console.log("THIS IS USER ", this.user)
      if (this.user) {
        const newProject = {
          name : project.name,
          description : project.description,
          startDate : project.startDate,
          user: this.user // Attach the entire user object
        };
  
    project.user = this.user
    this.projectService.createProject(newProject).subscribe((response) => {
      alert("Projet créé avec succès.")
      this.exitNewProject()
    },
    (error) => {
      console.error('Error creating project:', error);
    })}
    else {
      console.error('Error');
    }
  }

}

