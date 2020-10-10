import { NgModule } from "@angular/core"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { AppModule } from "@funk/ui/app/app.module"
import { AppComponent } from "@funk/ui/app/component"

@NgModule({
  imports: [BrowserAnimationsModule, AppModule],
  bootstrap: [AppComponent],
})
export class BrowserModule {}
