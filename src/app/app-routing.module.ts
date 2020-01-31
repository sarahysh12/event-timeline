import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TimelineComponent } from './components/timeline/timeline.component';
import { AppComponent } from './app.component';



const routes: Routes = [
    {
        path: '',
        component: AppComponent
    },
    {
        path: 'timeline',
        component: TimelineComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
