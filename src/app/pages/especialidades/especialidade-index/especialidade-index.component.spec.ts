import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspecialidadeIndexComponent } from './especialidade-index.component';

describe('EspecialidadeIndexComponent', () => {
  let component: EspecialidadeIndexComponent;
  let fixture: ComponentFixture<EspecialidadeIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EspecialidadeIndexComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EspecialidadeIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
