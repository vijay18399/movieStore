import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogBodyComponent } from '../dialog-body/dialog-body.component';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users!: any[];
  displayedColumns: string[] = ['username', 'email', 'roles', '_id'];
  loading: boolean = false;
  currentpage = 1;
  perPage = 8;
  totalCount = 0;
  constructor(private authService: AuthService, private matDialog: MatDialog) {}

  ngOnInit(): void {
    this.getUsers(1);
  }
  getUsers(page: number) {
    this.loading = true;
    this.authService.getUsers(page).subscribe((data: any) => {
      this.loading = false;
      this.totalCount = data.totalItems;
      this.users = data.users;
      this.currentpage = Number(page);
    });
  }
  assignRole(id: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = id;
    this.matDialog.open(DialogBodyComponent, dialogConfig);
  }
  pageChanged(currentpage: string) {
    this.getUsers(Number(currentpage));
  }
}
