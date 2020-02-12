import { ComponentFixture, TestBed } from '@angular/core/testing';
import {configureTestSuite} from 'ng-bullet';
import {MockComponent, MockModule, MockPipe} from 'ng-mocks';
import { UserSearcherComponent } from './user-searcher.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import axios from 'axios';

describe('UserSearcherComponent', () => {

  let component: UserSearcherComponent;
  let fixture: ComponentFixture<UserSearcherComponent>;

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
        UserSearcherComponent
      ],
      providers: []
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
  });
});
