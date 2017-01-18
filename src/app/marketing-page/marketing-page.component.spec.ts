/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MarketingPageComponent } from './marketing-page.component';

describe('MarketingPageComponent', () => {
  let component: MarketingPageComponent;
  let fixture: ComponentFixture<MarketingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketingPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
