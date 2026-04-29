import {Routes} from '@angular/router';
import {IndexComponent} from './index/index/index.component';
import {TestingGuard} from './testing-guard';

export const routes: Routes = [
  { path: 'wv', loadComponent: () => import('./wv/wv-section/wv-section.component').then(it => it.WvSectionComponent), title: 'WorldVisión', children:
      [
        { path: '', loadComponent: () => import('./wv/wv-index/wv-index.component').then(it => it.WvIndexComponent) },
        { path: 'quiz', title: 'Quiz', loadComponent: () => import('./wv/quiz/quiz.component').then(it => it.QuizComponent) },
        { path: 'creator',title: 'Editor', loadComponent: () => import('./wv/creator/creator.component').then(it => it.CreatorComponent) },
        { path: ':year', loadComponent: () => import('./wv/wv-edition/wv-edition.component').then(it => it.WvEditionComponent) }
      ]
  },
  { path: 'nublada', canActivate: [TestingGuard], children:
      [
        { path: '', canActivate: [TestingGuard], loadComponent: () => import('./nublada/nublada').then(it => it.Nublada) },
      ]
  },
  { path: '', component: IndexComponent, title: 'lofi-enjoyer' }
];
