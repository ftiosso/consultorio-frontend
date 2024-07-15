import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicoIndexComponent } from './medico-index.component';

describe('MedicoIndexComponent', () => {
  let component: MedicoIndexComponent;
  let fixture: ComponentFixture<MedicoIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MedicoIndexComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MedicoIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
