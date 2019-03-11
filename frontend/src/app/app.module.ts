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
  MatSnackBarModule
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

import { ListUnitComponent } from './components/units/list/listUnit.component';
import { CreateUnitComponent } from './components/units/create/createUnit.component';
import { EditUnitComponent } from './components/units/edit/editUnit.component';
import { UnitService } from './unit.service';
import { CategoriesEditComponent } from './components/categories/edit/edit.component';
import { CategoriesListComponent } from './components/categories/list/list.component';
import { CategoriesCreateComponent } from './components/categories/create/create.component';


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

  { path: 'products/create', component: ProductsCreateComponent},
  { path: 'products/edit/:id', component: ProductsEditComponent},
  { path: 'products/list', component: ProductsListComponent},

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
    CategoriesEditComponent,
    CategoriesListComponent,
    CategoriesCreateComponent
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
    FormsModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
