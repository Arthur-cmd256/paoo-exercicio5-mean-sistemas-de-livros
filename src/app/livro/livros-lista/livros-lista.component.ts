import { Component, OnInit, OnDestroy } from '@angular/core';
import {Livro} from '../livro.model';
import { LivroService } from '../livro.service';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-livros-lista',
  templateUrl: './livros-lista.component.html',
  styleUrls: ['./livros-lista.component.css']
})
export class LivrosListaComponent implements OnInit, OnDestroy {

  livros: Livro[];
  private livrosSubscription: Subscription;

  constructor(public livroService: LivroService) { }

//   livros = [
//     {
//     id: 1,
//     titulo: '1984',
//     autor: 'George Orwell',
//     pagina: 200,
//     },
//     {
//     id: 2,
//     titulo: 'Dom Quixote',
//     autor: 'Miguel de Cervantes',
//     pagina: 500,
//     },
//     {
//     id: 3,
//     titulo: 'O Cortiço',
//     autor: 'Aluísio de Azevedo',
//     pagina: 300,
//     },
// ];

  // ngOnInit(): void {
  //   this.livros = this.livroService.getLivros();
  //   this.livrosSubscription = this.livroService
  //   .getListaLivrosAtualizadaObservable()
  //   .subscribe((livros: Livro[]) => {
  //     this.livros = livros;
  //   })
  // }
  
  ngOnInit(): void {
    this.livroService.getLivros();
    this.livrosSubscription = this.livroService
    .getListaLivrosAtualizadaObservable()
    .subscribe((livros: Livro[]) => {
      this.livros = livros;
    });
  }

  ngOnDestroy(): void {
      this.livrosSubscription.unsubscribe();
  }

  onDelete( id: string): void {
    this.livroService.removerLivro(id);
  }

}

