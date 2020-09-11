import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { UserComponent } from "./components/user/user.component";
import { SignUpComponent } from "./components/user/sign-up/sign-up.component";
import { SignInComponent } from "./components/user/sign-in/sign-in.component";
import { HomeComponent } from "./components/home/home.component";
import { LayoutComponent } from "./components/layout/layout.component";
import { AuthGuard } from "./auth/auth.guard";
import { ProfileComponent } from "./components/profile/profile.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "/signin",
    pathMatch: "full",
  },
  {
    path: "",
    component: UserComponent,
    children: [{ path: "signup", component: SignUpComponent }],
  },
  {
    path: "",
    component: UserComponent,
    children: [{ path: "signin", component: SignInComponent }],
  },
  {
    path: "",
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [{ path: "home", component: HomeComponent }],
  },
  {
    path: "",
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [{ path: ":username", component: ProfileComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
