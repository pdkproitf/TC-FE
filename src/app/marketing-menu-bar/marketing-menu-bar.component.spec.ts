/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MarketingMenuBarComponent } from './marketing-menu-bar.component';

describe('MarketingMenuBarComponent', () => {
  let component: MarketingMenuBarComponent;
  let fixture: ComponentFixture<MarketingMenuBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketingMenuBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketingMenuBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
