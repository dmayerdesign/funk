import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { BlogContainer } from './container'
import { HomeComponent } from './home/component'

const routes: Routes = [
  {
    path: '',
    component: BlogContainer,
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'prefix',
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
export class BlogModule { }
