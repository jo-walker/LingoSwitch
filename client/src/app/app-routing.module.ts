import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectsComponent } from './components/projects/projects.component';
import { ProjectFormComponent } from './components/project-form/project-form.component';
import { ProjectDetailsComponent } from './components/project-details/project-details.component';
import { UrlsComponent } from './components/urls/urls.component';
import { UrlFormComponent } from './components/url-form/url-form.component';
import { StringsComponent } from './components/strings/strings.component';
import { StringFormComponent } from './components/string-form/string-form.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guards/auth.guard';  // Import the AuthGuard

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },  // Redirect to login if no other route matches
  { path: 'login', component: LoginComponent },  // Route for the login component
  { path: 'register', component: RegisterComponent },  // Route for the register component
  { path: 'projects', component: ProjectsComponent, canActivate: [AuthGuard] },  // Protect these routes
  { path: 'projects/new', component: ProjectFormComponent, canActivate: [AuthGuard] },
  { path: 'projects/edit/:id', component: ProjectFormComponent, canActivate: [AuthGuard] },
  { path: 'projects/:id', component: ProjectDetailsComponent, canActivate: [AuthGuard] },
  { path: 'urls', component: UrlsComponent, canActivate: [AuthGuard] },
  { path: 'urls/new', component: UrlFormComponent, canActivate: [AuthGuard] },
  { path: 'urls/edit/:id', component: UrlFormComponent, canActivate: [AuthGuard] },
  { path: 'strings', component: StringsComponent, canActivate: [AuthGuard] },
  { path: 'strings/new', component: StringFormComponent, canActivate: [AuthGuard] },
  { path: 'strings/edit/:id', component: StringFormComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/login', pathMatch: 'full' }  // Redirect to login for any unmatched routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }