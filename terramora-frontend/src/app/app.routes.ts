import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PropertiesComponent } from './pages/properties/properties.component';
import { PropertyDetailComponent } from './pages/property-detail/property-detail.component';
import { AdminPropertiesComponent } from './pages/admin-properties/admin-properties.component';
import { AdminLoginComponent } from './pages/admin-login/admin-login.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'propiedades',
    component: PropertiesComponent
  },
  {
    path: 'propiedades/:id',
    component: PropertyDetailComponent
  },
  {
    path: 'admin/login',
    component: AdminLoginComponent
  },
  {
    path: 'admin/propiedades',
    component: AdminPropertiesComponent,
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
];