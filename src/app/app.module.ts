import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserSearcherComponent } from './components/user-searcher/user-searcher.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppSpinnerComponent } from './shared/app-spinner/app-spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    UserSearcherComponent,
    AppSpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  exports: [
    AppSpinnerComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
