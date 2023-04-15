import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeoductListComponent } from './peoduct-list.component';

describe('PeoductListComponent', () => {
  let component: PeoductListComponent;
  let fixture: ComponentFixture<PeoductListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeoductListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeoductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
