import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/mobile/home/home.component';
import { WaitingRoomComponent } from './pages/mobile/waiting-room/waiting-room.component';
import { QuestionComponent } from './pages/mobile/question/question.component';
import { FinalResultsComponent } from './pages/mobile/final-results/final-results.component';
import { RouterModule } from '@angular/router';
import { ROUTES } from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WaitingRoomComponent,
    QuestionComponent,
    FinalResultsComponent
  ],
  imports: [
    RouterModule.forRoot(ROUTES, { onSameUrlNavigation: 'reload' }),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
