import { Component } from '@angular/core';
import { TaskService } from '../services/task.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-task',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {

  constructor(private taskService : TaskService) {}
  



}
