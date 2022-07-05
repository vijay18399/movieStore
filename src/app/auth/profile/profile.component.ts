import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
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

  Logout() {
    this.tokenStorage.signOut();
  }
  getUser() {
    return this.tokenStorage.getUser();
  }
}
