import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input'
import {MatButtonModule} from '@angular/material/button'
import {MatCardModule} from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatDialogModule} from '@angular/material/dialog'
import {MatSnackBarModule} from '@angular/material/snack-bar'
import {MatIconModule} from '@angular/material/icon'
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatTooltipModule} from '@angular/material/tooltip';
import { FormsModule } from '@angular/forms';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { RouterModule, Routes } from '@angular/router';
import { GenrePageComponent } from './genre-page/genre-page.component';
import { DirectorPageComponent } from './director-page/director-page.component';
import { SynopsisPageComponent } from './synopsis-page/synopsis-page.component';
import { UserProfilePageComponent } from './user-profile-page/user-profile-page.component';
import { UpdateInfoFormComponent } from './update-info-form/update-info-form.component';
import { DeleteUserDialogComponent } from './delete-user-dialog/delete-user-dialog.component';
import { HeaderComponent } from './header/header.component';
import { DataService } from './data-service/data-service';
import { MovieListComponent } from './movie-list/movie-list.component';
const appRoutes: Routes = [
  {path: 'welcome', component: WelcomePageComponent},
  {path: 'movies', component: MovieCardComponent},
  {path: 'profile', component: UserProfilePageComponent},
  {path: '', redirectTo: 'welcome', pathMatch: 'prefix'}
]

@NgModule({
  declarations: [
    AppComponent,
    UserRegistrationFormComponent,
    UserLoginFormComponent,
    MovieCardComponent,
    WelcomePageComponent,
    GenrePageComponent,
    DirectorPageComponent,
    SynopsisPageComponent,
    UserProfilePageComponent,
    UpdateInfoFormComponent,
    DeleteUserDialogComponent,
    HeaderComponent,
    MovieListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSnackBarModule,
    MatIconModule,
    MatTooltipModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
