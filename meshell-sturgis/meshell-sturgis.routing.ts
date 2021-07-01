import { Routes } from "@angular/router"
import { PageComponent } from "./components/page/page.component"
import { PostComponent } from "./components/post/post.component"
import { CategoryComponent } from "./containers/category/category.component"
import { ContactComponent } from "./containers/contact/contact.component"
import { HomeComponent } from "./containers/home/home.component"
import { MeshellSturgisComponent } from "./meshell-sturgis.component"

export const routes: Routes = [
  {
    path: "",
    component: MeshellSturgisComponent,
    children: [
      {
        path: "",
        component: HomeComponent,
      },
      {
        path: "about",
        component: PageComponent,
        data: {
          page: "about",
          titleId: "about-title",
          bodyId: "about-body",
          coverImageId: "about-cover-image",
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
          titleId: "art-title",
          bodyId: "art-body",
        },
      },
      {
        path: "teaching",
        component: PageComponent,
        data: {
          page: "teaching",
          titleId: "teaching-title",
          bodyId: "teaching-body",
        },
      },
      {
        path: "research",
        component: PageComponent,
        data: {
          page: "research",
          titleId: "research-title",
          bodyId: "research-body",
        },
      },
      {
        path: "c-v",
        component: PageComponent,
        data: {
          page: "c-v",
          titleId: "c-v-title",
          bodyId: "c-v-body",
        },
      },
      {
        path: "writing",
        component: PageComponent,
        data: {
          page: "writing",
          titleId: "writing-title",
          bodyId: "writing-body",
        },
      },
      {
        path: "blog",
        component: PageComponent,
        data: {
          page: "blog",
          titleId: "blog-title",
          bodyId: "blog-body",
        },
      },
      {
        path: "publicity",
        component: PageComponent,
        data: {
          page: "publicity",
          titleId: "publicity-title",
          bodyId: "publicity-body",
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
        path: "posts/:post",
        component: PostComponent,
      },
      {
        path: "**",
        redirectTo: "",
        pathMatch: "full",
      },
    ],
  },
]
