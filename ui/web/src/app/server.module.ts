import { NgModule } from '@angular/core'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { ServerModule } from '@angular/platform-server'
import { RouterModule, Routes } from '@angular/router'
import { AppShellComponent } from './app-shell/component'
import { AppModule } from './app.module'
import { AppComponent } from './component'

const routes: Routes = [
  { path: 'shell', component: AppShellComponent }
]

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    NoopAnimationsModule,
    RouterModule.forRoot(routes),
  ],
  bootstrap: [AppComponent],
  declarations: [AppShellComponent],
})
export class AppServerModule {}