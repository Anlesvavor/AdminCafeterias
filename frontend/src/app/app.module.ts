import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { FormsModule} from "@angular/forms";
import { MatToolbarModule,
  MatFormFieldModule,
  MatOptionModule,
  MatInputModule,
  MatSelectModule,
  MatIconModule,
  MatCardModule,
  MatTableModule,
  MatDividerModule,
  MatSnackBarModule,
  MatAutocompleteModule,
} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserListComponent } from './components/users/list/users-list.component';
import { UserCreateComponent } from './components/users/create/users-create.component';
import { UserEditComponent } from './components/users/edit/users-edit.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { UserService } from './user.service';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { ProvidersEditComponent } from './components/providers/providers-edit/providers-edit.component';
import { ProvidersListComponent } from './components/providers/providers-list/providers-list.component';
import { ProvidersCreateComponent } from './components/providers/providers-create/providers-create.component';

import { ProductsEditComponent } from './components/products/edit/edit.component';
import { ProductsListComponent } from './components/products/list/list.component';
import { ProductsCreateComponent } from './components/products/create/create.component';

import { DinnersCreateComponent } from './components/dinners/create/create.component';
import { DinnersEditComponent } from './components/dinners/edit/edit.component';
import { DinnersListComponent } from './components/dinners/list/list.component';
import { ListUnitComponent } from './components/units/list/listUnit.component';
import { CreateUnitComponent } from './components/units/create/createUnit.component';
import { EditUnitComponent } from './components/units/edit/editUnit.component';
import { CategoriesEditComponent } from './components/categories/edit/edit.component';
import { CategoriesListComponent } from './components/categories/list/list.component';
import { CategoriesCreateComponent } from './components/categories/create/create.component';
import { RequisitionsCreateComponent } from './components/requisitions/create/create.component';
import { RequisitionsEditComponent } from './components/requisitions/edit/edit.component';
import { RequisitionsListComponent } from './components/requisitions/list/list.component';
import { RequisitionsDetailComponent } from './components/requisitions/detail/detail.component';
import { RolesListComponent } from './components/roles/list/list.component';
import { RolesEditComponent } from './components/roles/edit/edit.component';
import { RolesCreateComponent } from './components/roles/create/create.component';
import { CreateDeliveryTruckComponent } from './components/deliveryTrucks/create/createDeliveryTruck.component'
import { EditDeliveryTrucksComponent } from './components/deliveryTrucks/edit/editDeliveryTrucks.component';
import { ListDeliveryTruckComponent } from './components/deliveryTrucks/list/listDeliveryTruck.component';


import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

const routes: Routes = [

  { path: 'users/create', component: UserCreateComponent},
  { path: 'users/edit/:id', component: UserEditComponent},
  { path: 'users/list', component: UserListComponent},
  { path: 'dashboard', component: DashboardComponent},

  { path: 'providers/create', component: ProvidersCreateComponent},
  { path: 'providers/edit/:id', component: ProvidersEditComponent},
  { path: 'providers/list', component: ProvidersListComponent},

  { path: 'units/create', component: CreateUnitComponent},
  { path: 'units/edit/:id', component: EditUnitComponent},
  { path: 'units/list', component: ListUnitComponent},

  { path: 'categories/create', component: CategoriesCreateComponent},
  { path: 'categories/edit/:id', component: CategoriesEditComponent},
  { path: 'categories/list', component: CategoriesListComponent},

  { path: 'dinners/create', component: DinnersCreateComponent},
  { path: 'dinners/edit/:id', component: DinnersEditComponent},
  { path: 'dinners/list', component: DinnersListComponent},

  { path: 'products/create', component: ProductsCreateComponent},
  { path: 'products/edit/:id', component: ProductsEditComponent},
  { path: 'products/list', component: ProductsListComponent},

  { path: 'roles/create', component: RolesCreateComponent},
  { path: 'roles/edit/:id', component: RolesEditComponent},
  { path: 'roles/list', component: RolesListComponent},

  { path: 'requisitions/create', component: RequisitionsCreateComponent},
  { path: 'requisitions/edit/:id', component: RequisitionsEditComponent},
  { path: 'requisitions/list', component: RequisitionsListComponent},
  { path: 'requisitions/details/:id', component: RequisitionsDetailComponent},

  { path: 'deliverytrucks/create', component: CreateDeliveryTruckComponent},
  { path: 'deliverytrucks/edit/:id', component: EditDeliveryTrucksComponent},
  { path: 'deliverytrucks/list', component: ListDeliveryTruckComponent},

  { path: '', redirectTo: 'users/list', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    UserCreateComponent,
    UserEditComponent,
    NavbarComponent,
    SidebarComponent,
    DashboardComponent,
    ProvidersEditComponent,
    ProvidersListComponent,
    ProvidersCreateComponent,
    ListUnitComponent,
    CreateUnitComponent,
    EditUnitComponent,
    ProductsEditComponent,
    ProductsListComponent,
    ProductsCreateComponent,
    DinnersCreateComponent,
    DinnersEditComponent,
    DinnersListComponent,
    CategoriesEditComponent,
    CategoriesListComponent,
    CategoriesCreateComponent,
    RequisitionsCreateComponent,
    RequisitionsEditComponent,
    RequisitionsListComponent,
    RequisitionsDetailComponent,
    RolesListComponent,
    RolesEditComponent,
    RolesCreateComponent,
    CreateDeliveryTruckComponent,
    ListDeliveryTruckComponent,
    EditDeliveryTrucksComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatToolbarModule,
    HttpClientModule,
    MatFormFieldModule,
    MatOptionModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    MatDividerModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    FormsModule,
    MatAutocompleteModule,
    NgxMatSelectSearchModule

  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
