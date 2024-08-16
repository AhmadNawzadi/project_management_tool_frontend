import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskService } from '../services/task.service';

import { NewTaskComponent } from './new-task.component';
import { Task } from '../models/task';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('NewTaskComponent', () => {
  let component: NewTaskComponent;
  let fixture: ComponentFixture<NewTaskComponent>;
  let taskServiceMock: any;

  beforeEach( () => {

    taskServiceMock = {
      createTask: jest.fn()
    };

    TestBed.configureTestingModule({
      imports: [NewTaskComponent, HttpClientTestingModule],
      providers: [
        {provide : TaskService, userValue : taskServiceMock}
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewTaskComponent);
    component = fixture.componentInstance;
   //fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should create a task and update the tasks array', (done) => {
  //   // Arrange
  //   const mockTask: Task = {
  //     name: "a",
  //     description: "w",
  //     dueDate: new Date("2023-04-04"),
  //     priority: "MEDIUM",
  //     status: "IN_PROGRESS",
  //   };

  //   component.projectId = 152;
  //   component.task = mockTask;
    

  //   const formattedTask = {
  //     ...mockTask,
  //     dueDate: "2023-04-04" // Manually format the dueDate as 'YYYY-MM-DD'
  //   };

  //   const mockTasks = [
  //     { name: 'Task 1', description: 'description 1', dueDate : new Date(), priority: 'HIGH',  status: 'TODO' },
  //     { name: 'Task 2', description: 'description 2', dueDate : new Date(), priority: 'LOW',  status: 'DONE' }
  //   ];
  //   taskServiceMock.createTask.mockReturnValue(of(mockTasks));

  //   // Act
  //   console.log("Creating task...");
  //   component.createTask();

  //   expect(taskServiceMock.createTask).toHaveBeenCalledWith(formattedTask, 152);
  //   expect(component.tasks).toEqual(mockTasks);
  //   done();

  // });

});
