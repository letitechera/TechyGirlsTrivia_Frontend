import { Routes } from '@angular/router';
import { HomeComponent } from '@pages/mobile/home/home.component';
import { QuestionComponent } from '@pages/mobile/question/question.component';
import { WaitingRoomComponent } from '@pages/mobile/waiting-room/waiting-room.component';
import { FinalResultsComponent } from '@pages/mobile/final-results/final-results.component';

export const ROUTES: Routes = [
    { path: '', component: HomeComponent },
    { path: 'waiting', component: WaitingRoomComponent },
    { path: 'question', component: QuestionComponent },
    { path: 'final', component: FinalResultsComponent },
    // { path: 'public/events/:id', component: PublicEventComponent },
  ];
