import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { Task } from '../models/task';
import { TaskService } from '../services/task.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-task',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './update-task.component.html',
  styleUrl: './update-task.component.scss'
})
export class UpdateTaskComponent implements OnInit {

  @Output() exit = new EventEmitter();

  constructor(private taskService : TaskService){}

  ngOnInit(): void {
    this.setData()
  }

  task : Task = {
    name: '',
    description: '',
    dueDate: new Date(),
    priority: '',
    status: ''
  }

  @Input() taskId : any
  @Input() existingTask : any

  exitNewTask(){
    this.exit.emit()
  }

  setData(){
    this.task.name = this.existingTask.name
    this.task.description = this.existingTask.description
    this.task.dueDate = this.existingTask.dueDate
    this.task.priority = this.existingTask.priority
    this.task.status = this.existingTask.status
    console.log(" THIS TASK NAME ", this.task.name)
  }

  updateTask(){
    this.taskService.updateTask(this.taskId, this.task).subscribe({
      next: (response) => {
        console.log('Task updated successfully', response);
        alert("Tâche mis a jour avec succès")
        //this.exitUpateTask();
      },
      error: (err) => {
        console.error('Error updating assignment', err);
      }
    })
  }


}
