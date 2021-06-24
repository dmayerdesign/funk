import { HttpClientModule } from "@angular/common/http"
import { NgModule } from "@angular/core"
import { RouterModule } from "@angular/router"
import {
  construct as constructGetToken,
  GET_TOKEN,
  INITIALIZE_TURING_TEST,
} from "@funk/auth/plugins/external/turing-test/behaviors/get-token"
import { ContentModule } from "@funk/content/infrastructure/external/module"
import { AppCommonModule } from "@funk/ui/infrastructure/external/common.module"
import { FunctionsModule } from "@funk/ui/infrastructure/external/functions.module"
import { load as loadRecaptcha } from "recaptcha-v3"
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
  imports: [
    AppCommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    FunctionsModule,
    ContentModule,
  ],
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
  providers: [
    {
      provide: INITIALIZE_TURING_TEST,
      useValue: loadRecaptcha,
    },
    {
      provide: GET_TOKEN,
      useFactory: constructGetToken,
      deps: [INITIALIZE_TURING_TEST],
    },
  ],
})
export class MeshellSturgisModule {}
