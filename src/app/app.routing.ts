import { Routes } from '@angular/router';
import { HomeComponent } from '@pages/mobile/home/home.component';
import { QuestionComponent } from '@pages/mobile/question/question.component';
import { WaitingRoomComponent } from '@pages/mobile/waiting-room/waiting-room.component';
import { FinalResultsComponent } from '@pages/mobile/final-results/final-results.component';
import { WelcomeComponent } from '@pages/screen/welcome/welcome.component';
import { WaitingComponent } from '@pages/screen/waiting/waiting.component';
import { PublicQuestionComponent } from '@pages/screen/public-question/public-question.component';
import { PodiumComponent } from '@pages/screen/podium/podium.component';
import { TimerComponent } from '@pages/mobile/timer/timer.component';

export const ROUTES: Routes = [
  /* MOBILE */ 
    { path: '',   redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'waiting', component: WaitingRoomComponent },
    { path: 'question', component: QuestionComponent },
    { path: 'final', component: FinalResultsComponent },
    { path: 'timer', component: TimerComponent },

  /* SCREEN */ 
    { path: 'screen/welcome', component: WelcomeComponent },
    { path: 'screen/waiting', component: WaitingComponent },
    { path: 'screen/question', component: PublicQuestionComponent },
    { path: 'screen/podium', component: PodiumComponent },
  ];
