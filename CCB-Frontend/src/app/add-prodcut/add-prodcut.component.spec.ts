import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProdcutComponent } from './add-prodcut.component';

describe('AddProdcutComponent', () => {
  let component: AddProdcutComponent;
  let fixture: ComponentFixture<AddProdcutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProdcutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddProdcutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
