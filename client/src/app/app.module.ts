import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StringListComponent } from './string-list/string-list.component';
import { StringFormComponent } from './string-form/string-form.component';
import { StringService } from './string.service';

@NgModule({
  declarations: [
    AppComponent,
    StringListComponent,
    StringFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [StringService],
  bootstrap: [AppComponent]
})
export class AppModule { }
