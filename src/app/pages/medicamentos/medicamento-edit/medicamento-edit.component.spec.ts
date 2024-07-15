import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicamentoEditComponent } from './medicamento-edit.component';

describe('MedicamentoEditComponent', () => {
  let component: MedicamentoEditComponent;
  let fixture: ComponentFixture<MedicamentoEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MedicamentoEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MedicamentoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
