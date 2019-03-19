import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
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
import { LoginComponent } from './login/login.component';
import { DinerCheckComponent } from './components/deliver/dinerCheck/dinerCheck.component';
import { LoginService } from './login.service';
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './token-interceptor.service'

const routes: Routes = [

  { path: 'login', component: LoginComponent},

  { path: 'users/create', component: UserCreateComponent, canActivate: [AuthGuard]},
  { path: 'users/edit/:id', component: UserEditComponent, canActivate: [AuthGuard]},
  { path: 'users/list', component: UserListComponent, canActivate: [AuthGuard]},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},

  { path: 'providers/create', component: ProvidersCreateComponent, canActivate: [AuthGuard]},
  { path: 'providers/edit/:id', component: ProvidersEditComponent, canActivate: [AuthGuard]},
  { path: 'providers/list', component: ProvidersListComponent, canActivate: [AuthGuard]},

  { path: 'units/create', component: CreateUnitComponent, canActivate: [AuthGuard]},
  { path: 'units/edit/:id', component: EditUnitComponent, canActivate: [AuthGuard]},
  { path: 'units/list', component: ListUnitComponent, canActivate: [AuthGuard]},

  { path: 'categories/create', component: CategoriesCreateComponent, canActivate: [AuthGuard]},
  { path: 'categories/edit/:id', component: CategoriesEditComponent, canActivate: [AuthGuard]},
  { path: 'categories/list', component: CategoriesListComponent, canActivate: [AuthGuard]},

  { path: 'dinners/create', component: DinnersCreateComponent, canActivate: [AuthGuard]},
  { path: 'dinners/edit/:id', component: DinnersEditComponent, canActivate: [AuthGuard]},
  { path: 'dinners/list', component: DinnersListComponent, canActivate: [AuthGuard]},

  { path: 'products/create', component: ProductsCreateComponent, canActivate: [AuthGuard]},
  { path: 'products/edit/:id', component: ProductsEditComponent, canActivate: [AuthGuard]},
  { path: 'products/list', component: ProductsListComponent, canActivate: [AuthGuard]},

  { path: 'roles/create', component: RolesCreateComponent, canActivate: [AuthGuard]},
  { path: 'roles/edit/:id', component: RolesEditComponent, canActivate: [AuthGuard]},
  { path: 'roles/list', component: RolesListComponent, canActivate: [AuthGuard]},

  { path: 'requisitions/create', component: RequisitionsCreateComponent, canActivate: [AuthGuard]},
  { path: 'requisitions/edit/:id', component: RequisitionsEditComponent, canActivate: [AuthGuard]},
  { path: 'requisitions/list', component: RequisitionsListComponent, canActivate: [AuthGuard]},
  { path: 'requisitions/details/:id', component: RequisitionsDetailComponent, canActivate: [AuthGuard]},

  { path: 'deliverytrucks/create', component: CreateDeliveryTruckComponent, canActivate: [AuthGuard]},
  { path: 'deliverytrucks/edit/:id', component: EditDeliveryTrucksComponent, canActivate: [AuthGuard]},
  { path: 'deliverytrucks/list', component: ListDeliveryTruckComponent, canActivate: [AuthGuard]},

  { path: 'delivers/dinerCheck', component: DinerCheckComponent, canActivate: [AuthGuard]},



  { path: '', redirectTo: 'dashboard', pathMatch: 'full', canActivate: [AuthGuard]}
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
    EditDeliveryTrucksComponent,
    LoginComponent,
    DinerCheckComponent
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
    MatAutocompleteModule

  ],
  providers: [UserService, LoginService, AuthGuard,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
