import { NgModule } from "@angular/core"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { AppModule } from "@funk/ui/web/app/app.module"
import { AppComponent } from "@funk/ui/web/app/component"

@NgModule({
  imports: [
    BrowserAnimationsModule,
    AppModule,
  ],
  bootstrap: [ AppComponent ],
})
export class BrowserModule
{ }
