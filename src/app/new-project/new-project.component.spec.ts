import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewProjectComponent } from './new-project.component';
import { of, throwError } from 'rxjs';
import { Project } from '../models/project';
import { SharedDataService } from '../services/shared-data.service';
import { ProjectService } from '../services/project.service';

describe('NewProjectComponent', () => {
  let component: NewProjectComponent;
  let fixture: ComponentFixture<NewProjectComponent>;
  let projectServiceMock: any;
  let sharedDataServiceMock: any;
  

  beforeEach(async () => {
    sharedDataServiceMock = {
      user$: of({ id: 1, username: 'Test User', password: 1234 }), // Mocking an observable that returns a user
    };

    // Mocking ProjectService
    projectServiceMock = {
      createProject: jest.fn(),
    };
    // Mock global alert function
        // Mock window.alert
        jest.spyOn(window, 'alert').mockImplementation(() => {});

    await TestBed.configureTestingModule({
      imports: [NewProjectComponent],
      providers: [
        { provide: ProjectService, useValue: projectServiceMock },
        { provide: SharedDataService, useValue: sharedDataServiceMock },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewProjectComponent);
    component = fixture.componentInstance;

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set user when getUser is called', () => {
    // Call the getUser method
    component.getUser();
    expect(component.user).toEqual({id: 1, username: 'Test User', password: 1234 });
  });

  it('should create a project when createProject is called and user is defined', () => {
    const project: Project = {
      name: 'Test Project',
      description: 'Test Description',
      startDate: new Date(),
      user: undefined,
    };

    projectServiceMock.createProject.mockReturnValue(of({ success: true }));
    console.log("Creating project test")
    component.createProject(project);

    expect(projectServiceMock.createProject).toHaveBeenCalledWith({
      name: 'Test Project',
      description: 'Test Description',
      startDate: project.startDate,
      user: { id: 1, username: 'Test User', password : 1234 },
    });
    expect(window.alert).toHaveBeenCalledWith('Projet créé avec succès.');
        expect(project.user).toEqual({ id: 1, username: 'Test User', password : 1234 });  
     
  });

  it('should not create a project when user is not defined', () => {
    // Set user to undefined
    component.user = undefined;

    const project: Project = {
      name: 'Test Project',
      description: 'Test Description',
      startDate: new Date(),
      user: undefined,
    };

    const consoleErrorSpy = jest.spyOn(console, 'error');

    component.createProject(project);
    expect(projectServiceMock.createProject).not.toHaveBeenCalled();
    
    expect(consoleErrorSpy).toHaveBeenCalledWith('Error: User is not defined');

    // Cleanup the spy
    consoleErrorSpy.mockRestore();
  });

});
