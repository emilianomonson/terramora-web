import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedPropertiesComponent } from './featured-properties.component';

describe('FeaturedProperties', () => {
  let component: FeaturedPropertiesComponent;
  let fixture: ComponentFixture<FeaturedPropertiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturedPropertiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeaturedPropertiesComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
