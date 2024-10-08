import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisionComponent } from './revision.component';

describe('RevisionComponent', () => {
  let component: RevisionComponent;
  let fixture: ComponentFixture<RevisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RevisionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RevisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
