import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnCerateTaskComponent } from './btn-cerate-task.component';

describe('BtnCerateTaskComponent', () => {
  let component: BtnCerateTaskComponent;
  let fixture: ComponentFixture<BtnCerateTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BtnCerateTaskComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BtnCerateTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
