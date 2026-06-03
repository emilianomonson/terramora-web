import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesSectionComponent } from './services-section.component';

describe('ServicesSection', () => {
  let component: ServicesSectionComponent;
  let fixture: ComponentFixture<ServicesSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicesSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicesSectionComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
