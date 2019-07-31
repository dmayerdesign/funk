import { NgModule } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule } from '@angular/router'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { NotFoundComponent } from './not-found/not-found.component'

@NgModule({
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    MatButtonModule,
    AppRoutingModule,
    RouterModule,
  ],
  declarations: [
    AppComponent,
    NotFoundComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
