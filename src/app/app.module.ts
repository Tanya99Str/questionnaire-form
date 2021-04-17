import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {InMemoryWebApiModule} from 'angular-in-memory-web-api';
import {InMemoryDataService} from './shared/service/in-memory-data.service';
import { RegistrationComponent } from './registration/registration.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {MaterialModule} from './shared/material.module';
import { HobbyComponent } from './registration/hobby/hobby.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    HobbyComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  exports: [
    CommonModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
