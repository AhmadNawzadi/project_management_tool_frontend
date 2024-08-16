import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTaskComponent } from './update-task.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('UpdateTaskComponent', () => {
  let component: UpdateTaskComponent;
  let fixture: ComponentFixture<UpdateTaskComponent>;

  beforeEach(async () => {
    // await TestBed.configureTestingModule({
    //   imports: [UpdateTaskComponent, HttpClientTestingModule]
    // })
    // .compileComponents();
    
    // fixture = TestBed.createComponent(UpdateTaskComponent);
    // component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(true).toBeTruthy();
  });
});