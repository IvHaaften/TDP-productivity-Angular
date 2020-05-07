
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './routing-pages/homepage/homepage.component';
import { SelectPageComponent } from './routing-pages/select-page/select-page.component';
import { ListPageComponent } from './routing-pages/list-page/list-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomepageComponent },
  { path: 'select', component: SelectPageComponent},
  { path: 'list', component: ListPageComponent }  
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }