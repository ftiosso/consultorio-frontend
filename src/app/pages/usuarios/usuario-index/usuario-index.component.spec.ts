import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioIndexComponent } from './usuario-index.component';

describe('UsuarioIndexComponent', () => {
  let component: UsuarioIndexComponent;
  let fixture: ComponentFixture<UsuarioIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsuarioIndexComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsuarioIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
