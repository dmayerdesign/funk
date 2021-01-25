import { NgModule } from "@angular/core"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { AppModule } from "@funk/ui/infrastructure/external/app.module"
import { AppComponent } from "@funk/ui/infrastructure/external/component"

@NgModule({
  imports: [BrowserAnimationsModule, AppModule],
  bootstrap: [AppComponent],
})
export class BrowserModule {}
