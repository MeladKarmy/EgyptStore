import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrolComponent } from './scrol.component';

describe('ScrolComponent', () => {
  let component: ScrolComponent;
  let fixture: ComponentFixture<ScrolComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScrolComponent]
    });
    fixture = TestBed.createComponent(ScrolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
