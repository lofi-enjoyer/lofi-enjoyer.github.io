import { Routes } from '@angular/router';
import {WvIndexComponent} from './wv/wv-index/wv-index.component';
import {WvEditionComponent} from './wv/wv-edition/wv-edition.component';
import {WvSectionComponent} from './wv/wv-section/wv-section.component';
import {CreatorComponent} from './wv/creator/creator.component';
import {IndexComponent} from './index/index/index.component';
import {QuizComponent} from './wv/quiz/quiz.component';

export const routes: Routes = [
  { path: 'wv', component: WvSectionComponent, title: 'WorldVisión', children:
      [
        { path: '', component: WvIndexComponent },
        { path: 'quiz', component: QuizComponent, title: 'Quiz' },
        { path: 'creator', component: CreatorComponent, title: 'Editor' },
        { path: ':year', component: WvEditionComponent }
      ]
  },
  { path: '', component: IndexComponent, title: 'lofi-enjoyer' }
];
