import { Component } from '@angular/core';
import { TokenStorageService } from './services/token-storage.service';
import { User } from 'src/app/models/user.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'movieStore';
  semi_transparent = true;
  user: User = {
    roles: [],
    accessToken: '',
    email: '',
    id: '',
    refreshToken: '',
    username: '',
  };
  isModerator: boolean = false;
  isAdmin: boolean = false;
  constructor(public tokenStorage: TokenStorageService) {}
  ngOnInit(): void {
    this.user = this.getUser();
    this.isModerator = this.user.roles.includes('moderator');
    this.isAdmin = this.user.roles.includes('admin');
  }
  getUser() {
    return this.tokenStorage.getUser();
  }
  Logout() {
    this.tokenStorage.signOut();
  }
}
