import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListItemMovieComponent } from './list-item-movie.component';

describe('ListItemMovieComponent', () => {
  let component: ListItemMovieComponent;
  let fixture: ComponentFixture<ListItemMovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListItemMovieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListItemMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
