import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogTrucksComponent } from './dialog-trucks.component';

describe('DialogTrucksComponent', () => {
  let component: DialogTrucksComponent;
  let fixture: ComponentFixture<DialogTrucksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogTrucksComponent]
    });
    fixture = TestBed.createComponent(DialogTrucksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
