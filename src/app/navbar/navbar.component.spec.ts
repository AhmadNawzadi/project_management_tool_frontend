import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { SharedDataService } from '../services/shared-data.service';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let sharedServiceMock: any;
  let routerMock: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent],
      providers: [
        { provide: SharedDataService, useValue: sharedServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();
    
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    sharedServiceMock = {
      isAuth$: of(true), 
    };

    routerMock = {
      navigate: jest.fn(),
    };

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set isAuthenticated to true when auth is true', () => {
    component.getAuth();
    expect(component.isAuthenticated).toBe(true);
  })


});
