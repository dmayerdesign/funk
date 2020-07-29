import { CommonModule } from "@angular/common"
import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { BlogContainer } from "@funk/ui/app/blog/container"
import { HomeComponent } from "@funk/ui/app/blog/home/component"

const routes: Routes = [
  {
    path: "",
    component: BlogContainer,
    children: [
      {
        path: "home",
        component: HomeComponent,
      },
      {
        path: "",
        redirectTo: "home",
        pathMatch: "full",
      },
    ],
  },
]

@NgModule({
  declarations: [
    BlogContainer,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
})
export class BlogModule
{ }
