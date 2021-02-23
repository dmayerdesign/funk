import { Routes } from "@angular/router"
import { PageComponent } from "./components/page/page.component"
import { CategoryComponent } from "./containers/category/category.component"
import { ContactComponent } from "./containers/contact/contact.component"
import { HomeComponent } from "./containers/home/home.component"

export const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
  },
  {
    path: "about",
    component: PageComponent,
    data: {
      page: "about",
    },
  },
  {
    path: "contact",
    component: ContactComponent,
  },
  {
    path: "art",
    component: PageComponent,
    data: {
      page: "art",
    },
  },
  {
    path: "teaching",
    component: PageComponent,
    data: {
      page: "teaching",
    },
  },
  {
    path: "research",
    component: PageComponent,
    data: {
      page: "research",
    },
  },
  {
    path: "c-v",
    component: PageComponent,
    data: {
      page: "c-v",
    },
  },
  {
    path: "projects",
    component: CategoryComponent,
    data: {
      category: "projects",
    },
  },
  {
    path: "teaching",
    component: CategoryComponent,
    data: {
      category: "teaching",
    },
  },
  {
    path: "art",
    component: CategoryComponent,
    data: {
      category: "art",
    },
  },
  {
    path: "**",
    redirectTo: "",
    pathMatch: "full",
  },
]
