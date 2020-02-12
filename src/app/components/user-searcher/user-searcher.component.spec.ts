import { ComponentFixture, TestBed } from '@angular/core/testing';
import { configureTestSuite } from 'ng-bullet';
import { MockComponent, MockModule } from 'ng-mocks';
import { UserSearcherComponent } from './user-searcher.component';
import { AppSpinnerComponent } from '../../shared/app-spinner/app-spinner.component';
import { FormsModule, FormGroup, ReactiveFormsModule, FormBuilder, FormControl } from '@angular/forms';
import axios from 'axios';

describe('UserSearcherComponent', () => {

  let component: UserSearcherComponent;
  let fixture: ComponentFixture<UserSearcherComponent>;
  const formBuilder: FormBuilder = new FormBuilder();
  const axiosSpy = jasmine.createSpyObj('axios', [
    'getUserData',
    'getRepos'
  ]);

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      imports: [
        MockModule(FormsModule),
        MockModule(ReactiveFormsModule),
      ],
      declarations: [
        UserSearcherComponent,
        MockComponent(AppSpinnerComponent)
      ],
      providers: [
        {provide: FormBuilder, useValue: formBuilder},
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSearcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.userForm).toBeDefined();
    expect(component.loading).toBeFalsy();
  });

  it('should not perform GET request if form is invalid', () => {
    component.userForm = new FormGroup({
      userName: new FormControl('  ')
    });
    const method = component.findUser();
    component.findUser();
    expect(method).toBeNull();
  });
});
