import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImmersiveLandSectionComponent } from './immersive-land-section.component';

describe('ImmersiveLandSection', () => {
  let component: ImmersiveLandSectionComponent;
  let fixture: ComponentFixture<ImmersiveLandSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImmersiveLandSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImmersiveLandSectionComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
