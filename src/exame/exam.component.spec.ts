import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamFormComponent } from './exame.component';

describe('ConsultaComponent', () => {
  let component: ExamFormComponent;
  let fixture: ComponentFixture<ExamFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExamFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
