import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateInfoFormComponent } from './update-info-form.component';

describe('UpdateInfoFormComponent', () => {
  let component: UpdateInfoFormComponent;
  let fixture: ComponentFixture<UpdateInfoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateInfoFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateInfoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
