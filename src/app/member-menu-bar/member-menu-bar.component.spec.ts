/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MemberMenuBarComponent } from './member-menu-bar.component';

describe('MemberMenuBarComponent', () => {
  let component: MemberMenuBarComponent;
  let fixture: ComponentFixture<MemberMenuBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberMenuBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberMenuBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
