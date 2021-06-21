import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioComponentComponent } from './usuario-component.component';

describe('UsuarioComponentComponent', () => {
  let component: UsuarioComponentComponent;
  let fixture: ComponentFixture<UsuarioComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuarioComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
