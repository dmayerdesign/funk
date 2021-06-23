import { HttpClientModule } from "@angular/common/http"
import { NgModule } from "@angular/core"
import { RouterModule } from "@angular/router"
import { AppCommonModule } from "@funk/ui/infrastructure/external/common.module"
import { FunctionsModule } from "@funk/ui/infrastructure/external/functions.module"
import { FooterComponent } from "./components/footer/footer.component"
import { MastheadComponent } from "./components/masthead/masthead.component"
import { MsBackBtnComponent } from "./components/ms-back-btn/ms-back-btn.component"
import { PageComponent } from "./components/page/page.component"
import { PostComponent } from "./components/post/post.component"
import { CategoryComponent } from "./containers/category/category.component"
import { ContactComponent } from "./containers/contact/contact.component"
import { HomeComponent } from "./containers/home/home.component"
import { MeshellSturgisComponent } from "./meshell-sturgis.component"
import { routes } from "./meshell-sturgis.routing"

@NgModule({
  declarations: [
    MeshellSturgisComponent,
    ContactComponent,
    HomeComponent,
    CategoryComponent,
    PageComponent,
    PostComponent,
    MastheadComponent,
    MsBackBtnComponent,
    FooterComponent,
  ],
  imports: [
    AppCommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    FunctionsModule,
  ],
})
export class MeshellSturgisModule {}
