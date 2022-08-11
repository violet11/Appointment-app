import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarberComponent } from './barber.component';

describe('BarberComponent', () => {
  let component: BarberComponent;
  let fixture: ComponentFixture<BarberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
