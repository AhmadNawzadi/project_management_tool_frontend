import { Component, Output, EventEmitter, Input } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  providers:[
    TaskService
  ],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.scss'
})
export class NewTaskComponent {

  @Output() exit = new EventEmitter();

  constructor(private taskService : TaskService){}

  tasks : any[] = []
  @Input() projectId : any

  task : Task = {
    name: '',
    description: '',
    dueDate: new Date(),
    priority: '',
    status: ''
  }

  exitNewTask(){
    this.exit.emit()
  }

  createTask(){
    console.log("Project id from new task", this.projectId)
    this.taskService.createTask(this.task, this.projectId).subscribe(data => {
      this.tasks = data
      console.log("TASKS : ", this.tasks)
    })
  }

}

