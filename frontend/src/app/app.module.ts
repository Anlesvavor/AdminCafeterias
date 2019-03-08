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
import { ListComponent } from './components/users/list/list.component';
import { CreateComponent } from './components/users/create/create.component';
import { EditComponent } from './components/users/edit/edit.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { UserService } from './user.service';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import { ListUnitComponent } from './components/units/list/listUnit.component';
import { CreateUnitComponent } from './components/units/create/createUnit.component';
import { EditUnitComponent } from './components/units/edit/editUnit.component';
import { UnitService } from './unit.service';

const routes: Routes = [
  { path: 'users/create', component: CreateComponent},
  { path: 'users/edit/:id', component: EditComponent},
  { path: 'users/list', component: ListComponent},

  { path: 'units/create', component: CreateUnitComponent},
  { path: 'units/edit/:id', component: EditUnitComponent},
  { path: 'units/list', component: ListUnitComponent},

  { path: '', redirectTo: 'users/list', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    CreateComponent,
    EditComponent,
    NavbarComponent,
    SidebarComponent
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
  providers: [UserService, UnitService],
  bootstrap: [AppComponent]
})
export class AppModule { }
