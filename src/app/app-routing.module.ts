import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from './shared/guards/auth-guard.service';
import { MainComponent } from './main/main.component';


const routes: Routes = [
	{ path: "", pathMatch: "full", redirectTo: "login" },
	{ path: "login", component: LoginComponent },
	{ path: "registration", component: RegistrationComponent },
	{ path: "main", component: MainComponent, canActivate: [AuthGuard] },
	{ path: '**', component: NotFoundComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
