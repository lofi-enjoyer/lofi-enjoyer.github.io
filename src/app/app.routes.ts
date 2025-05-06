import { Routes } from '@angular/router';
import {WvIndexComponent} from './wv-index/wv-index.component';
import {WvEditionComponent} from './wv-edition/wv-edition.component';
import {WvSectionComponent} from './wv-section/wv-section.component';
import {CreatorComponent} from './creator/creator.component';

export const routes: Routes = [
  { path: 'wv', component: WvSectionComponent, title: 'WorldVisión', children:
      [
        { path: '', component: WvIndexComponent },
        { path: 'creator', component: CreatorComponent, title: 'Editor' },
        { path: ':year', component: WvEditionComponent }
      ]
  }
];
