import { CommonModule } from "@angular/common"
import { NgModule } from "@angular/core"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { RouterModule, Routes } from "@angular/router"
import { ManagedContentModule } from "@funk/admin/infrastructure/external/managed-content/module"
import {
  construct as constructGetToken,
  GET_TOKEN,
  INITIALIZE_TURING_TEST,
} from "@funk/auth/plugins/external/turing-test/behaviors/get-token"
import { AboutContainer } from "@funk/professional-portfolio/infrastructure/external/about/container"
import { ContactContainer } from "@funk/professional-portfolio/infrastructure/external/contact/container"
import { ProfessionalPortfolioContainer } from "@funk/professional-portfolio/infrastructure/external/container"
import { HonorsContainer } from "@funk/professional-portfolio/infrastructure/external/honors/container"
import { PublicationsContainer } from "@funk/professional-portfolio/infrastructure/external/publications/container"
import { TeachingContainer } from "@funk/professional-portfolio/infrastructure/external/teaching/container"
import atlas from "@funk/ui/atlas/configuration"
import { IonicModule } from "@ionic/angular"
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
    ],
  },
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ManagedContentModule,
  ],
  declarations: [
    ProfessionalPortfolioContainer,
    AboutContainer,
    ContactContainer,
    HonorsContainer,
    PublicationsContainer,
    TeachingContainer,
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