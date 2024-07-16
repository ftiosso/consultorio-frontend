import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspecialidadeCreateComponent } from './especialidade-create.component';

describe('EspecialidadeCreateComponent', () => {
  let component: EspecialidadeCreateComponent;
  let fixture: ComponentFixture<EspecialidadeCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EspecialidadeCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EspecialidadeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
