import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewClubNameComponent } from './view-club-name.component';

describe('ViewClubNameComponent', () => {
  let component: ViewClubNameComponent;
  let fixture: ComponentFixture<ViewClubNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewClubNameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewClubNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
