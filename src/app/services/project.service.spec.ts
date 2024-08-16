import { TestBed } from '@angular/core/testing';

import { ProjectService } from './project.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Project } from '../models/project';

describe('ProjectService', () => {
  let service: ProjectService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProjectService]
    });

    service = TestBed.inject(ProjectService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verify that no unmatched requests are outstanding
  });

  describe('#getData', () => {
    it('should return an Observable of an array of projects', () => {
      const dummyProjects = [
        { name: 'Project 1', description: 'Description 1' },
        { name: 'Project 2', description: 'Description 2' }
      ];

      service.getData(123).subscribe(projects => {
        expect(projects.length).toBe(2);
        expect(projects).toEqual(dummyProjects);
      });

      const req = httpMock.expectOne('http://localhost:8080/project/user/123');
      expect(req.request.method).toBe('GET');
      req.flush(dummyProjects); // Simulate a successful response with dummy data
    });
  });

  describe('#createProject', () => {
    it('should post a new project and return it', () => {
      const newProject: Project = {
        name: 'New Project',
        description: 'New Description',
        startDate: new Date(),
        user: {username: 'User 1', email : 'test@gmail.com', password:'123' } // Adjust according to your Project model
      };

      service.createProject(newProject).subscribe(response => {
        expect(response).toEqual(newProject);
      });

      const req = httpMock.expectOne('http://localhost:8080/project');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(newProject);

      req.flush(newProject); // Simulate a successful response with the new project data
    });
  });
});


