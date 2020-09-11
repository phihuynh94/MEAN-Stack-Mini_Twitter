import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AngularFontAwesomeModule } from "angular-font-awesome";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { UserComponent } from "./components/user/user.component";
import { SignUpComponent } from "./components/user/sign-up/sign-up.component";
import { SignInComponent } from "./components/user/sign-in/sign-in.component";
import { HomeComponent } from "./components/home/home.component";
import { AuthInterceptor } from "./auth/auth.interceptor";
import { NavBarComponent } from "./components/nav-bar/nav-bar.component";
import { LayoutComponent } from "./components/layout/layout.component";
import { SideBarComponent } from "./components/side-bar/side-bar.component";
import { TweetService } from "./shared/services/tweet.service";
import { ProfileComponent } from "./components/profile/profile.component";

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    SignUpComponent,
    SignInComponent,
    HomeComponent,
    NavBarComponent,
    LayoutComponent,
    SideBarComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AngularFontAwesomeModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    TweetService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
