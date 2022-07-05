import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-dialog-body',
  templateUrl: './dialog-body.component.html',
  styleUrls: ['./dialog-body.component.css'],
})
export class DialogBodyComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DialogBodyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private authService: AuthService
  ) {}
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  roleCtrl = new FormControl('');
  filteredRoles!: Observable<string[]>;
  allRoles: string[] = ['admin', 'moderator', 'user'];
  @ViewChild('roleInput')
  roleInput!: ElementRef<HTMLInputElement>;
  loading = false;
  ngOnInit(): void {}
  close() {
    this.dialogRef.close();
  }
  addRole(event: MatChipInputEvent) {
    const value = (event.value || '').trim();
    if (value) {
      this.data.roles.push(value);
    }
    event.chipInput!.clear();
  }
  removeRole(index: number) {
    this.data.roles.splice(index, 1);
  }
  selected(event: MatAutocompleteSelectedEvent): void {
    this.data.roles.push(event.option.viewValue);
    this.roleInput.nativeElement.value = '';
    this.roleCtrl.setValue(null);
  }
  update() {
    this.loading = true;
    this.authService.updateUser(this.data).subscribe((data) => {
      console.log(data);
      this.loading = false;
    });
  }
}
