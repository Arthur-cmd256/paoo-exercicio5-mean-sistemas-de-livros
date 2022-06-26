import { Component, EventEmitter, Output} from '@angular/core';
import { NgForm } from '@angular/forms';
import { LivroService } from '../livro.service';

@Component({
  selector: 'app-livro-cadastrar',
  templateUrl: './livro-cadastrar.component.html',
  styleUrls: ['./livro-cadastrar.component.css']
})

export class LivroCadastrarComponent {

  constructor(public livroService: LivroService) {}

  onAdicionarLivro(form:NgForm) {
    if(form.invalid){
      return;
    }
    this.livroService.adicionarLivro(
      // form.value.id,
      form.value.titulo,
      form.value.autor,
      form.value.paginas
    );
    form.resetForm();
  }
}
