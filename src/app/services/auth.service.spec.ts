import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { SharedDataService } from './shared-data.service';
import { User } from '../models/user';
import { of } from 'rxjs';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let sharedDataService: SharedDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        {
          provide: SharedDataService,
          useValue: {
            setUserId: jest.fn(),
            setUser: jest.fn(),
            setAuth: jest.fn()
          }
        }
      ]
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    sharedDataService = TestBed.inject(SharedDataService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#setUserData', () => {
    it('should set user data correctly', () => {
      const mockUser = { id: 123 };
      service.setUserData(mockUser);
      expect(sharedDataService.setUserId).toHaveBeenCalledWith(mockUser.id);
    });
  });

  describe('#getUser', () => {
    it('should return user data', () => {
      const mockUser = { email: 'test@example.com', password: 'password123' };
      const mockResponse = { id: 1, email: 'test@example.com', password: 'password123' };

      service.getUser(mockUser).subscribe(response => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne('http://localhost:8080/user');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(mockUser);
      req.flush(mockResponse);
    });
  });

  describe('#getUserByEmailAndPassword', () => {
    it('should return user data as a promise', async () => {
      const mockUser = { email: 'test@example.com', password: 'password123' };
      const mockResponse = { id: 1, email: 'test@example.com', password: 'password123' };

      jest.spyOn(service, 'getUser').mockReturnValue(of(mockResponse));

      const result = await service.getUserByEmailAndPassword(mockUser);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('#signIn', () => {
    it('should authenticate and set user data when sign in is successful', async () => {
      const email = 'test@example.com';
      const password = 'password123';
      const mockUserData = { id: 1, email, password };

      jest.spyOn(service, 'getUserByEmailAndPassword').mockResolvedValue(mockUserData);

      const result = await service.signIn(email, password);

      expect(result).toBe(true);
      expect(service.isAuthenticated).toBe(true);
      expect(sharedDataService.setUser).toHaveBeenCalledWith(mockUserData);
      expect(sharedDataService.setAuth).toHaveBeenCalledWith(true);
    });

    it('should return false when sign in fails', async () => {
      const email = 'test@example.com';
      const password = 'password123';

      jest.spyOn(service, 'getUserByEmailAndPassword').mockRejectedValue(new Error('Sign in failed'));

      const result = await service.signIn(email, password);

      expect(result).toBe(false);
      expect(service.isAuthenticated).toBe(false);
      expect(sharedDataService.setUser).not.toHaveBeenCalled();
      expect(sharedDataService.setAuth).not.toHaveBeenCalled();
    });
  });

  describe('#createUser', () => {
    it('should create a user and return the created user', () => {
      const mockUser: User = { username: 'ahmad', email: 'newuser@example.com', password: 'newpassword' };
      const mockResponse = { ...mockUser };

      service.createUser(mockUser).subscribe(response => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne('http://localhost:8080/user/create');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(mockUser);
      req.flush(mockResponse);
    });
  });
});
