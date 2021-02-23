import { HttpClientModule } from "@angular/common/http"
import { NgModule } from "@angular/core"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { BrowserModule } from "@angular/platform-browser"
import { RouterModule } from "@angular/router"
import { AppComponent } from "./app.component"
import { routes } from "./app.routing"
import { ArchiveInterceptComponent } from "./components/archive-intercept/archive-intercept.component"
import { FooterComponent } from "./components/footer/footer.component"
import { MastheadComponent } from "./components/masthead/masthead.component"
import { MsBackBtnComponent } from "./components/ms-back-btn/ms-back-btn.component"
import { PageComponent } from "./components/page/page.component"
import { PostComponent } from "./components/post/post.component"
import { CategoryComponent } from "./containers/category/category.component"
import { ContactComponent } from "./containers/contact/contact.component"
import { HomeComponent } from "./containers/home/home.component"

@NgModule({
  declarations: [
    AppComponent,
    ContactComponent,
    HomeComponent,
    CategoryComponent,
    PageComponent,
    PostComponent,
    MastheadComponent,
    MsBackBtnComponent,
    FooterComponent,
    ArchiveInterceptComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
  ],
  bootstrap: [AppComponent],
})
export class MeshellSturgisModule {}
