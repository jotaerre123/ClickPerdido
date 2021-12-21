import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';

import { ObjectFormComponent } from './components/object-form/object-form.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', component: LoginComponent },
  { path: 'login', pathMatch: 'full', redirectTo: '/login' },

  { path: 'login', pathMatch: 'full', component: LoginComponent },
  { path: 'form', pathMatch: 'full', component: ObjectFormComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
