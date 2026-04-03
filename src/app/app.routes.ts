import { Routes } from '@angular/router';
import {WvIndexComponent} from './wv/wv-index/wv-index.component';
import {WvEditionComponent} from './wv/wv-edition/wv-edition.component';
import {WvSectionComponent} from './wv/wv-section/wv-section.component';
import {CreatorComponent} from './wv/creator/creator.component';
import {IndexComponent} from './index/index/index.component';
import {QuizComponent} from './wv/quiz/quiz.component';

export const routes: Routes = [
  { path: 'wv', loadComponent: () => import('./wv/wv-section/wv-section.component').then(it => it.WvSectionComponent), title: 'WorldVisión', children:
      [
        { path: '', loadComponent: () => import('./wv/wv-index/wv-index.component').then(it => it.WvIndexComponent) },
        { path: 'quiz', title: 'Quiz', loadComponent: () => import('./wv/quiz/quiz.component').then(it => it.QuizComponent) },
        { path: 'creator',title: 'Editor', loadComponent: () => import('./wv/creator/creator.component').then(it => it.CreatorComponent) },
        { path: ':year', loadComponent: () => import('./wv/wv-edition/wv-edition.component').then(it => it.WvEditionComponent) }
      ]
  },
  { path: '', component: IndexComponent, title: 'lofi-enjoyer' }
];
