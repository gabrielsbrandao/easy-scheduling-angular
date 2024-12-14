import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelecaoCadastroComponent } from './cadastro.component';

describe('SelecaoCadastroComponent', () => {
  let component: SelecaoCadastroComponent;
  let fixture: ComponentFixture<SelecaoCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelecaoCadastroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelecaoCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
