import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TemplateComponent } from './pages/template/template.component';
import { ReactiveComponent } from './pages/reactive/reactive.component';

/* importamos el FormsMudule (formularios) */
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
/* importamos el HttpClientModule (para la Api de Países) */
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    TemplateComponent,
    ReactiveComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, // inyectamos formularios templates
    HttpClientModule, // inyectamos 
    ReactiveFormsModule // inyectamos formularios reactivos
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
