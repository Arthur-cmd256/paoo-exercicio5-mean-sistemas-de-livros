import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { LivrosListaComponent } from "./livro/livros-lista/livros-lista.component";
import { LivroCadastrarComponent } from "./livro/livro-cadastrar/livro-cadastrar.component";

const routes: Routes = [
    { path: '', component: LivrosListaComponent },
    { path: 'criar', component: LivroCadastrarComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})

export class AppRoutingModule {

}