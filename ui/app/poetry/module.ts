import { CommonModule } from "@angular/common"
import { NgModule } from "@angular/core"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { RouterModule, Routes } from "@angular/router"
import { ManagedContentModule } from "@funk/ui/app/admin/managed-content/module"
import { AboutContainer } from "@funk/ui/app/poetry/about/container"
import { ContactContainer } from "@funk/ui/app/poetry/contact/container"
import { PoetryContainer } from "@funk/ui/app/poetry/container"
import { HonorsContainer } from "@funk/ui/app/poetry/honors/container"
import { PublicationsContainer } from "@funk/ui/app/poetry/publications/container"
import { TeachingContainer } from "@funk/ui/app/poetry/teaching/container"
import {
  construct as constructGetToken,
  GET_TOKEN,
  INITIALIZE_TURING_TEST,
} from "@funk/ui/app/turing-test/get-token"
import atlas from "@funk/ui/core/atlas/atlas"
import { IonicModule } from "@ionic/angular"
import { load as loadRecaptcha } from "recaptcha-v3"

const routes: Routes = [
  {
    path: "",
    component: PoetryContainer,
    children: [
      {
        path: "about",
        component: AboutContainer,
        data: {
          title: atlas.poetry.__atlas__.about.label,
        },
      },
      {
        path: "contact",
        component: ContactContainer,
        data: {
          title: atlas.poetry.__atlas__.contact.label,
        },
      },
      {
        path: "honors",
        component: HonorsContainer,
        data: {
          title: atlas.poetry.__atlas__.honors.label,
        },
      },
      {
        path: "publications",
        component: PublicationsContainer,
        data: {
          title: atlas.poetry.__atlas__.publications.label,
        },
      },
      {
        path: "teaching",
        component: TeachingContainer,
        data: {
          title: atlas.poetry.__atlas__.teaching.label,
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
    PoetryContainer,
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
export class PoetryModule {}
