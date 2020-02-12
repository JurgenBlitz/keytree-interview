import { ComponentFixture, TestBed } from '@angular/core/testing';
import { configureTestSuite } from 'ng-bullet';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { UserSearcherComponent } from './components/user-searcher/user-searcher.component';
import { MockComponent } from '../../node_modules/ng-mocks';

describe('AppComponent', () => {

  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        MockComponent(UserSearcherComponent)
      ],
      providers: []
    });
  });

  beforeEach((() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'javascript-interview-project'`, () => {
    expect(component.title).toEqual('keytree-interview-project');
  });

});
