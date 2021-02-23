import { Routes } from '@angular/router';
import { devConfig } from '../config';
import { prodConfig } from '../config.prod';
import { stagingConfig } from '../config.staging';
import { environment } from '../environments/environment';
import { ArchiveInterceptComponent } from './components/archive-intercept/archive-intercept.component';
import { PageComponent } from './components/page/page.component';
import { PostComponent } from './components/post/post.component';
import { CategoryComponent } from './containers/category/category.component';
import { ContactComponent } from './containers/contact/contact.component';
import { HomeComponent } from './containers/home/home.component';

const CONFIG = environment.production ? prodConfig : environment.staging ? stagingConfig : devConfig;
const rootPath = CONFIG.rootPath;
const pathPrefix = !!rootPath ? rootPath + "/" : ""

export const routes: Routes = [
  {
    path: rootPath,
    component: HomeComponent,
  },
  {
    path: pathPrefix + 'about',
    component: PageComponent,
    data: {
      page: 'about',
    },
  },
  {
    path: pathPrefix + 'contact',
    component: ContactComponent,
  },
  {
    path: pathPrefix + 'art',
    component: PageComponent,
    data: {
      page: 'art',
    },
  },
  {
    path: pathPrefix + 'teaching',
    component: PageComponent,
    data: {
      page: 'teaching',
    },
  },
  {
    path: pathPrefix + 'research',
    component: PageComponent,
    data: {
      page: 'research',
    },
  },
  {
    path: pathPrefix + 'c-v',
    component: PageComponent,
    data: {
      page: 'c-v',
    },
  },
  {
    path: pathPrefix + 'projects',
    component: CategoryComponent,
    data: {
      category: 'projects',
    },
  },
  {
    path: pathPrefix + 'teaching',
    component: CategoryComponent,
    data: {
      category: 'teaching',
    },
  },
  {
    path: pathPrefix + 'art',
    component: CategoryComponent,
    data: {
      category: 'art',
    },
  },
  {
    path: pathPrefix + 'posts/:post',
    component: PostComponent,
  },
  {
    path: pathPrefix + 'archives/:postId',
    component: ArchiveInterceptComponent,
  },
  {
    path: "**",
    redirectTo: rootPath,
    pathMatch: "full",
  },
];
