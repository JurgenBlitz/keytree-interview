import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AppSpinnerComponent} from './app-spinner.component';
import {configureTestSuite} from 'ng-bullet';

describe('AppSpinnerComponent', () => {
  let component: AppSpinnerComponent;
  let fixture: ComponentFixture<AppSpinnerComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppSpinnerComponent
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
