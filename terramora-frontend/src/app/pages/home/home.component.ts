import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { HeroComponent } from '../../components/hero/hero.component';
import { FeaturedPropertiesComponent } from '../../components/featured-properties/featured-properties.component';
import { ImmersiveLandSectionComponent } from '../../components/immersive-land-section/immersive-land-section.component';
import { ServicesSectionComponent } from '../../components/services-section/services-section.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NavbarComponent,
    HeroComponent,
    FeaturedPropertiesComponent,
    ImmersiveLandSectionComponent,
    ServicesSectionComponent,
    FooterComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}