import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './pagination/pagination.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DialogMessageComponent } from './dialog-message/dialog-message.component';

@NgModule({
  declarations: [PaginationComponent, DialogMessageComponent],
  imports: [CommonModule, MatIconModule, MatButtonModule],
  exports: [PaginationComponent],
})
export class SharedModule {}
