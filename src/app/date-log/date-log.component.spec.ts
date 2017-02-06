/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DateLogComponent } from './date-log.component';

describe('DateLogComponent', () => {
  let component: DateLogComponent;
  let fixture: ComponentFixture<DateLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
