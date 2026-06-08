import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PropertiesComponent } from './pages/properties/properties.component';
import { PropertyDetailComponent } from './pages/property-detail/property-detail.component';
import { AdminLoginComponent } from './pages/admin-login/admin-login.component';
import { AdminPropertiesComponent } from './pages/admin-properties/admin-properties.component';
import { ContactComponent } from './pages/contact/contact.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Terramora | Inmobiliaria'
  },
  {
    path: 'propiedades',
    component: PropertiesComponent,
    title: 'Propiedades | Terramora'
  },
  {
    path: 'propiedades/:id',
    component: PropertyDetailComponent,
    title: 'Detalle de propiedad | Terramora'
  },
  {
    path: 'contacto',
    component: ContactComponent,
    title: 'Contacto | Terramora'
  },
  {
    path: 'admin/login',
    component: AdminLoginComponent,
    title: 'Admin | Terramora'
  },
  {
    path: 'admin/propiedades',
    component: AdminPropertiesComponent,
    canActivate: [authGuard],
    title: 'Panel administrador | Terramora'
  },
  {
    path: '**',
    redirectTo: ''
  }
];