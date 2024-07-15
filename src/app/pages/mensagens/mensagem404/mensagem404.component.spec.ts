import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Mensagem404Component } from './mensagem404.component';

describe('Mensagem404Component', () => {
  let component: Mensagem404Component;
  let fixture: ComponentFixture<Mensagem404Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Mensagem404Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Mensagem404Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
