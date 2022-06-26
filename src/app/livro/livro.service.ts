import { Injectable } from "@angular/core";
import { Livro } from "./livro.model";
import { map, Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: 'root' })

export class LivroService{
  private livros:Livro[] = [];
  private listaLivrosAtualizada = new Subject<Livro[]>();

  constructor(private httpClient: HttpClient) { 

  }

  getLivros(): void {
    this.httpClient.get<{mensagem: string, livros: any}>('http://localhost:3000/api/livros').pipe(map((dados) => {
      return dados.livros.map((livro) => {
        return {
          id: livro._id,
          titulo: livro.titulo,
          autor: livro.autor,
          paginas: livro.paginas,
        };
      });
    } ))
    .subscribe(
      (livros) => {
        this.livros = livros;
        this.listaLivrosAtualizada.next([...this.livros]);
      }
    )
  }

  // getLivros(): Livro[]{
  //   return [...this.livros];
  // }

  adicionarLivro(id: number, titulo: string, autor: string, paginas: number) {
    const livro: Livro = {
      id, 
      titulo, 
      autor, 
      paginas,
    };
    this.httpClient.post<{mensagem: string}>('http://localhost:3000/api/livros', livro).subscribe(
      (dados) => {
        console.log(dados.mensagem);
        this.livros.push(livro);
        this.listaLivrosAtualizada.next([...this.livros]);
      }
      )
  }

  getListaLivrosAtualizadaObservable() {
    return this.listaLivrosAtualizada.asObservable();
  }

}
