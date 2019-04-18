import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/mobile/home/home.component';
import { WaitingRoomComponent } from './pages/mobile/waiting-room/waiting-room.component';
import { QuestionComponent } from './pages/mobile/question/question.component';
import { FinalResultsComponent } from './pages/mobile/final-results/final-results.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material/material.module';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ROUTES } from './app.routing';
import { APP_BASE_HREF } from '@angular/common';
import { SignalRService } from '@services/signal-r.service';
import { TimerComponent } from './pages/mobile/timer/timer.component';
import { WelcomeComponent } from './pages/screen/welcome/welcome.component';
import { WaitingComponent } from './pages/screen/waiting/waiting.component';
import { PodiumComponent } from './pages/screen/podium/podium.component';
import { PublicQuestionComponent } from './pages/screen/public-question/public-question.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WaitingRoomComponent,
    QuestionComponent,
    FinalResultsComponent,
    TimerComponent,
    WelcomeComponent,
    WaitingComponent,
    PodiumComponent,
    PublicQuestionComponent
  ],
  imports: [
    RouterModule.forRoot(ROUTES, { onSameUrlNavigation: 'reload' }),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    MatDialogModule,
    BrowserAnimationsModule
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    SignalRService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
