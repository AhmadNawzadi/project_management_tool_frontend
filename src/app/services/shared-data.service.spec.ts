import { TestBed } from '@angular/core/testing';
import { SharedDataService } from './shared-data.service';
import { take } from 'rxjs';

describe('SharedDataService', () => {
  let service: SharedDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedDataService);
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  describe('#setUserId', () => {
    it('should update the userIdSubject and emit the new userId', (done) => {
      const testUserId = 123;
      service.userId$.subscribe(userId => {
        expect(userId).toBe(testUserId);
        done(); // Indicates that the asynchronous test has completed
      });

      service.setUserId(testUserId);
    });

    // it('should allow setting userId to null', (done) => {
    //   service.userId$.subscribe(userId => {
    //     expect(userId).toBeNull();
    //     done();
    //   });

    //   service.setUserId(null);
    // });

    it('should allow setting userId to null', (done) => {
      service.userId$
        .pipe(take(1)) // This ensures the observable completes after the first emission.
        .subscribe(userId => {
          expect(userId).toBeNull();
          done(); // Done is only called once here.
        });

      service.setUserId(null);
    });
  });

  describe('#setUser', () => {
    it('should update the userSubject and emit the new user', (done) => {
      const testUser = { name: 'John Doe', email: 'john.doe@example.com' };
      service.user$.subscribe(user => {
        expect(user).toEqual(testUser);
        done();
      });

      service.setUser(testUser);
    });

    it('should allow setting user to null', (done) => {
      service.user$
      .pipe(take(1))
      .subscribe(user => {
        expect(user).toBeNull();
        done();
      });

      service.setUser(null);
    });
  });

  describe('#setAuth', () => {
    it('should update the isAuthSubject and emit the new auth state', (done) => {
      service.isAuth$.subscribe(isAuth => {
        expect(isAuth).toBe(true);
        done();
      });

      service.setAuth(true);
    });

    it('should allow setting auth state to null', (done) => {
      service.isAuth$
      .pipe(take(1))
      .subscribe(isAuth => {
        expect(isAuth).toBeNull();
        done();
      });

      service.setAuth(null);
    });
  });

  describe('#setProjectId', () => {
    it('should update the projectIdSubject and emit the new projectId', (done) => {
      const testProjectId = 456;
      service.projectId$.subscribe(projectId => {
        expect(projectId).toBe(testProjectId);
        done();
      });

      service.setProjectId(testProjectId);
    });

    it('should allow setting projectId to null', (done) => {
      service.projectId$
      .pipe(take(1))
      .subscribe(projectId => {
        expect(projectId).toBeNull();
        done();
      });

      service.setProjectId(null);
    });
  });
});
