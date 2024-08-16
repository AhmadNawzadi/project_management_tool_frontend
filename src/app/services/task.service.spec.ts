import { TestBed } from '@angular/core/testing';
import { TaskService } from './task.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Task } from '../models/task';

describe('TaskService', () => {
  let service: TaskService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TaskService]
    });
    service = TestBed.inject(TaskService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getData', () => {
    it('should return an Observable of tasks', () => {
      const mockTasks = [
        { name: 'Task 1', description: 'description 1', dueDate: new Date(), priority: 'HIGH', status: 'TODO' },
        { name: 'Task 2', description: 'description 2', dueDate: new Date(), priority: 'LOW', status: 'DONE' }
      ];
      const projectId = 1;

      service.getData(projectId).subscribe(tasks => {
        expect(tasks.length).toBe(2);
        expect(tasks).toEqual(mockTasks);
      });

      const req = httpMock.expectOne(`${service['apiUrl']}?projectId=${projectId}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockTasks);
    });
  });

  describe('#createTask', () => {
    it('should create a task and return the created task', () => {
      const mockTask: Task = {
        name: 'Test Task',
        description: 'Test Description',
        dueDate: new Date(),
        priority: 'HIGH',
        status: 'TODO'
      };
      const projectId = 1;

      service.createTask(mockTask, projectId).subscribe(returnedTask => {
        expect(returnedTask).toEqual(mockTask);
      });

      const req = httpMock.expectOne(`${service['apiUrl']}/${projectId}`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(mockTask);
      req.flush(mockTask);
    });
  });

  describe('#assignTask', () => {
    it('should assign a task to a project manager', () => {
      const taskId = 1;
      const pmId = 2;

      service.assignTask(taskId, pmId).subscribe(response => {
        expect(response).toEqual({}); 
      });

      const req = httpMock.expectOne(`http://localhost:8080/assignment/${taskId}/${pmId}`);
      expect(req.request.method).toBe('POST');
      req.flush({});
    });
  });

  describe('#updateTask', () => {
    it('should update a task and return the updated task', () => {
      const taskId = 1;
      const updatedTask: Task = {
        name: 'Updated Task',
        description: 'Updated Description',
        dueDate: new Date(),
        priority: 'MEDIUM',
        status: 'IN_PROGRESS'
      };

      service.updateTask(taskId, updatedTask).subscribe(returnedTask => {
        expect(returnedTask).toEqual(updatedTask);
      });

      const req = httpMock.expectOne(`${service['apiUrl']}/${taskId}`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(updatedTask);
      req.flush(updatedTask);
    });
  });

  describe('#getTaskById', () => {
    it('should return a task by its ID', () => {
      const taskId = 1;
      const mockTask: Task = {
        name: 'Test Task',
        description: 'Test Description',
        dueDate: new Date(),
        priority: 'HIGH',
        status: 'TODO'
      };

      service.getTaskById(taskId).subscribe(task => {
        expect(task).toEqual(mockTask);
      });

      const req = httpMock.expectOne(`${service['apiUrl']}/${taskId}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockTask);
    });
  });
});
