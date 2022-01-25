import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { Todo } from './todo';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  //Variavel para armazenar os todos salvos
  todos: Todo[] = []

  //Variavel que controla o formulario
  form: FormGroup = new FormGroup({
    //description é um campo do formulario
    description: new FormControl('', [Validators.required, Validators.minLength(4)])
  })

  constructor(
    //Injeção de serviço, inicializa a clase 
    private service : TodoService 
  ){}
  
  //Metodo chamado antes de iniciar o componente
  ngOnInit(){
      this.listTodos();
  }
  
  listTodos(){
    this.service.list().subscribe(todoList => {
      this.todos = todoList;
    })
  }

  done(todo: Todo){
    this.service.markAsDone(todo.id).subscribe({
      //next method: recebe a resposta do metodo markAsDone
      next: (todoAtualizado) => {
        todo.done = todoAtualizado.done
        todo.doneDate = todoAtualizado.doneDate
      }
    })
  }

  submit(){
    //console.log: Imprime o valor do campo description
    //this.form.value: cria um objeto com todos os valores do formulario form 
    console.log(this.form.value)
    //Modelo Todo
    //...this.form.value: distribui os valores do formulario segundo os campos do modelo 
    const todo: Todo =  {...this.form.value}
    //Faz a requisição
    this.service
    .save(todo)
    .subscribe(//Metodo subcribe trata o retorno da requisição 
      //savedTodo: Objeto que foi retornado da api 
      savedTodo => {
        //Adiciona todas as todos no array 
        this.todos.push(savedTodo)
        //Reseta o formulario
        this.form.reset()
      }
    )
  }

  delete(todo: Todo){
    this.service.delete(todo.id).subscribe({
      next: (response) => this.listTodos()
    })
  }
}
