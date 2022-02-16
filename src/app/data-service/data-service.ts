import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FetchApiDataService } from '../fetch-api-data.service';

@Injectable()
export class DataService {
  public currentUser: any = {}
  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router
  ) {}

  updateUser(username: string | null, userData: any): void {
    this.fetchApiData
      .editUserProfile(username, userData)
      .subscribe((res: any) => {
        localStorage.setItem('user', res.Username);
      });
  }

  deleteUser(username: string | null): void {
    this.fetchApiData.deleteUserProfile(username).subscribe((res: any) => {
      localStorage.clear();
      this.router.navigate(['/']);
    });
  }
}
