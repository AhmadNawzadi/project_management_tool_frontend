import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MemberService } from './member.service'; // Adjust the path as necessary
import { SharedDataService } from './shared-data.service'; // Adjust the path as necessary

describe('MemberService', () => {
  let service: MemberService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MemberService, SharedDataService]
    });

    service = TestBed.inject(MemberService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verify that no unmatched requests are outstanding
  });

  describe('#updateRole', () => {
    it('should send a PATCH request to update the role of a member', () => {
      const memberId = 1;
      const projectId = 2;
      const role = 'ADMIN';

      service.updateRole(memberId, projectId, role).subscribe(response => {
        expect(response).toBeTruthy(); // Expect some kind of truthy response
      });

      const req = httpMock.expectOne(`http://localhost:8080/members/${memberId}/${projectId}/${role}`);
      expect(req.request.method).toBe('PATCH');
      req.flush({ success: true }); // Simulate a successful response
    });
  });

  describe('#getMembersByProjectId', () => {
    it('should return an Observable of members for the given projectId', () => {
      const projectId = 1;
      const dummyMembers = [
        { id: 1, name: 'Member 1', role: 'Member' },
        { id: 2, name: 'Member 2', role: 'Admin' }
      ];

      service.getMembersByProjectId(projectId).subscribe(members => {
        expect(members.length).toBe(2);
        expect(members).toEqual(dummyMembers);
      });

      const req = httpMock.expectOne(`http://localhost:8080/members/${projectId}`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyMembers); // Simulate a successful response with dummy data
    });
  });

  describe('#inviteMember', () => {
    it('should send a POST request to invite a member by email', () => {
      const email = 'test@example.com';
      const projectId = 1;

      service.inviteMember(email, projectId).subscribe(response => {
        expect(response).toBeTruthy(); // Expect some kind of truthy response
      });

      const req = httpMock.expectOne(`http://localhost:8080/invitation?to=${email}&projectId=${projectId}`);
      expect(req.request.method).toBe('POST');
      req.flush({ success: true }); // Simulate a successful response
    });
  });

  describe('#getProjectById', () => {
    it('should return an Observable of a project for the given projectId', () => {
      const projectId = 1;
      const dummyProject = { id: projectId, name: 'Project 1', description: 'Project Description' };

      service.getProjectById(projectId).subscribe(project => {
        expect(project).toEqual(dummyProject);
      });

      const req = httpMock.expectOne(`http://localhost:8080/project/${projectId}`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyProject); // Simulate a successful response with dummy project data
    });
  });
});
