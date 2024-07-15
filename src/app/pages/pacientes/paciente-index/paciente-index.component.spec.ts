import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacienteIndexComponent } from './paciente-index.component';

describe('PacienteIndexComponent', () => {
  let component: PacienteIndexComponent;
  let fixture: ComponentFixture<PacienteIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PacienteIndexComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PacienteIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
