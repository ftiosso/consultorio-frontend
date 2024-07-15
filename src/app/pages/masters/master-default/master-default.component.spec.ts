import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterDefaultComponent } from './master-default.component';

describe('MasterDefaultComponent', () => {
  let component: MasterDefaultComponent;
  let fixture: ComponentFixture<MasterDefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MasterDefaultComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MasterDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
