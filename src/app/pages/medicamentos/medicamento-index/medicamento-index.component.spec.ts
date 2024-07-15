import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicamentoIndexComponent } from './medicamento-index.component';

describe('MedicamentoIndexComponent', () => {
  let component: MedicamentoIndexComponent;
  let fixture: ComponentFixture<MedicamentoIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MedicamentoIndexComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MedicamentoIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
