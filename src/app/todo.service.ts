import { Injectable } from '@angular/core';
import { Todo } from './todo';
//Rxjs: 
import { Observable } from 'rxjs';
//HttpClient: Classe para usar serviços client HTTP
import { HttpClient } from '@angular/common/http';
import{ environment } from '../environments/environment';
@Injectable({
  providedIn: 'root'
})

//Classe responsalve por fazer as requisições Http 
export class TodoService {
  
  //Url da api 
  apiUrl: string = environment.apiURL;

  constructor(
    //Injeção de serviço, inicializa a clase
    private http: HttpClient
  ) {}
  
  //Observable: Espera o retorno da requisão.
  save(todo: Todo) : Observable<Todo> {
    //http.post<Object>
    //Param n1: Url da api para a qual esta fazendo o post 
    //Param n2: Objeto Json que deve ser enviado no body
    return this.http.post<Todo>(this.apiUrl,todo)
  }

  //Retorna uma lista com todas as todos 
  list () : Observable<Todo[]>{
    return this.http.get<Todo[]>(this.apiUrl);    
  }

  //Deleta uma todo do bd
  delete(id: number) : Observable<void>{
    const url =  `${this.apiUrl}/${id}`
    return this.http.delete<void>(url);
  }

  markAsDone(id: number): Observable<Todo>{
    const url = `${this.apiUrl}/${id}/done`;
    return this.http.patch<Todo>(url, {})
  }
}
