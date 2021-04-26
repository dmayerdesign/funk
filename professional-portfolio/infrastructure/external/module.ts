import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { ContentModule } from "@funk/admin/content/infrastructure/external/module"
import {
  construct as constructGetToken,
  GET_TOKEN,
  INITIALIZE_TURING_TEST,
} from "@funk/auth/plugins/external/turing-test/behaviors/get-token"
import { BlogModule } from "@funk/blog/infrastructure/external/module"
import { TAXONOMY_TERM_SLUG_ROUTE_PARAM_RESOLVER } from "@funk/blog/infrastructure/external/tokens"
import { AboutContainer } from "@funk/professional-portfolio/infrastructure/external/about/container"
import { ContactContainer } from "@funk/professional-portfolio/infrastructure/external/contact/container"
import { ProfessionalPortfolioContainer } from "@funk/professional-portfolio/infrastructure/external/container"
import { HonorsContainer } from "@funk/professional-portfolio/infrastructure/external/honors/container"
import { PageTitleHeading } from "@funk/professional-portfolio/infrastructure/external/page/title-heading/component"
import { PostCategoryContainer } from "@funk/professional-portfolio/infrastructure/external/post/category/container"
import { PublicationsContainer } from "@funk/professional-portfolio/infrastructure/external/publications/container"
import { TeachingContainer } from "@funk/professional-portfolio/infrastructure/external/teaching/container"
import { TAXONOMY_TERM } from "@funk/taxonomy/model/taxonomy-term"
import atlas from "@funk/ui/atlas/configuration"
import { AppCommonModule } from "@funk/ui/infrastructure/external/common.module"
import { load as loadRecaptcha } from "recaptcha-v3"

const routes: Routes = [
  {
    path: "",
    component: ProfessionalPortfolioContainer,
    children: [
      {
        path: "about",
        component: AboutContainer,
        data: {
          title: atlas["professional-portfolio"].__atlas__.about.label,
        },
      },
      {
        path: "contact",
        component: ContactContainer,
        data: {
          title: atlas["professional-portfolio"].__atlas__.contact.label,
        },
      },
      {
        path: "honors",
        component: HonorsContainer,
        data: {
          title: atlas["professional-portfolio"].__atlas__.honors.label,
        },
      },
      {
        path: "publications",
        component: PublicationsContainer,
        data: {
          title: atlas["professional-portfolio"].__atlas__.publications.label,
        },
      },
      {
        path: "teaching",
        component: TeachingContainer,
        data: {
          title: atlas["professional-portfolio"].__atlas__.teaching.label,
        },
      },
      {
        path: `:${TAXONOMY_TERM}`,
        component: PostCategoryContainer,
        resolve: {
          taxonomyTerm: TAXONOMY_TERM_SLUG_ROUTE_PARAM_RESOLVER,
        },
        data: {
          title: atlas["professional-portfolio"].__atlas__.blog.label,
        },
      },
    ],
  },
]

@NgModule({
  imports: [
    AppCommonModule,
    RouterModule.forChild(routes),
    ContentModule,
    BlogModule,
  ],
  declarations: [
    PageTitleHeading,
    ProfessionalPortfolioContainer,
    AboutContainer,
    ContactContainer,
    HonorsContainer,
    PublicationsContainer,
    TeachingContainer,
    PostCategoryContainer,
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
export class ProfessionalPortfolioModule {}
