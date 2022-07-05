import { Component, Input, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { PageService } from 'src/app/services/page.service';
@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent implements OnInit {
  @Input() totalCount = 0;
  @Input() currentPage = 1;
  @Input() perPage = 14;
  @Output() _pageChanged = new EventEmitter<string>();

  allItems!: any[];
  pager: any = {};
  pageIndex = 0;
  constructor(public pageService: PageService) {}

  ngOnInit(): void {
    this.pager = this.pageService.getPager(
      this.totalCount,
      this.currentPage,
      this.perPage
    );
  }
  pageChanged(pageIndex: number) {
    this._pageChanged.emit(String(pageIndex));
  }
  getColor(page: any) {
    if (this.pager.currentPage === page) {
      return 'accent';
    }
    return 'primary';
  }
}
