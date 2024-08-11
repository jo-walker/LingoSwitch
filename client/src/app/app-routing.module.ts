import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectsComponent } from './components/projects/projects.component';
import { ProjectFormComponent } from './components/project-form/project-form.component';
import { ProjectDetailsComponent } from './components/project-details/project-details.component';
import { UrlsComponent } from './components/urls/urls.component';
import { UrlFormComponent } from './components/url-form/url-form.component';
import { StringsComponent } from './components/strings/strings.component';
import { StringFormComponent } from './components/string-form/string-form.component';


const routes: Routes = [
  // { path: '', redirectTo: '/projects', pathMatch: 'full' },
  // { path: 'projects', component: ProjectsComponent, canActivate: [AuthGuard] },
  // { path: 'projects/new', component: ProjectFormComponent, canActivate: [AuthGuard] },
  // { path: 'projects/edit/:id', component: ProjectFormComponent, canActivate: [AuthGuard] }

  { path: '', redirectTo: '/projects', pathMatch: 'full' },
  { path: 'projects', component: ProjectsComponent },
  { path: 'projects/new', component: ProjectFormComponent },
  { path: 'projects/edit/:id', component: ProjectFormComponent },
  { path: 'projects/:id', component: ProjectDetailsComponent },
  { path: 'urls', component: UrlsComponent },
  { path: 'urls/new', component: UrlFormComponent },
  { path: 'urls/edit/:id', component: UrlFormComponent },
  { path: 'strings', component: StringsComponent },
  { path: 'strings/new', component: StringFormComponent },
  { path: 'strings/edit/:id', component: StringFormComponent },];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }