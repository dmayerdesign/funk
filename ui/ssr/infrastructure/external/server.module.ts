import { NgModule } from "@angular/core"
import { NoopAnimationsModule } from "@angular/platform-browser/animations"
import { ServerModule } from "@angular/platform-server"
import { RouterModule, Routes } from "@angular/router"
import { AppShellComponent } from "@funk/ui/app-shell/infrastructure/component"
import { AppModule } from "@funk/ui/infrastructure/external/app.module"
import { AppComponent } from "@funk/ui/infrastructure/external/component"

const routes: Routes = [{ path: "shell", component: AppShellComponent }]

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
