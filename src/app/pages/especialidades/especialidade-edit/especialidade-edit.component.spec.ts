import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspecialidadeEditComponent } from './especialidade-edit.component';

describe('EspecialidadeEditComponent', () => {
  let component: EspecialidadeEditComponent;
  let fixture: ComponentFixture<EspecialidadeEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EspecialidadeEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EspecialidadeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
