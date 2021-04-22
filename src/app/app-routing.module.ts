import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'pericias',
    loadChildren: () => import('./pericias/pericias.module').then(m => m.PericiasModule)
  },
  { path: '', redirectTo: 'pericias', pathMatch: 'full' },
  { path: '**', redirectTo: 'pericias' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'disabled', useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
