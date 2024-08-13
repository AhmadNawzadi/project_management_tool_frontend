import { Routes } from '@angular/router';
import { ProjectComponent } from './project/project.component';
import { AppComponent } from './app.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MemberComponent } from './member/member.component';


export const routes: Routes = [
    {
        path: 'projects', component : ProjectComponent
    },
    {
        path: 'login', component : SignInComponent,
    },
    {
        path: 'members', component : MemberComponent,
    }
];
