import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilePersistGuard } from './guards/file-persist.guard';
import { LoadComponent } from './pages/load/load.component';
import { ViewpdfComponent } from './pages/viewpdf/viewpdf.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'load', component: LoadComponent },
      { path: 'show', component: ViewpdfComponent, canActivate: [FilePersistGuard] },
      //{ path: 'show', component: ViewpdfComponent },
      { path: '**', redirectTo: 'load' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PericiasRoutingModule { }
