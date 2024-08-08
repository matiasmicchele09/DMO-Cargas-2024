import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCarroceriasComponent } from './dialog-carrocerias.component';

describe('DialogCarroceriasComponent', () => {
  let component: DialogCarroceriasComponent;
  let fixture: ComponentFixture<DialogCarroceriasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogCarroceriasComponent]
    });
    fixture = TestBed.createComponent(DialogCarroceriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
