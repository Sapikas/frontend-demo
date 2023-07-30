import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { DietAgenciesListPage } from './pages/diet-agencies-list/diet-agencies-list.page';
import { DietAgencyPage } from './pages/diet-agency/diet-agency.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'agencies',
    pathMatch: 'full',
  },
  {
    path: 'agencies',
    component: DietAgenciesListPage,
  },
  {
    path: 'agency/:name',
    component: DietAgencyPage,
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
