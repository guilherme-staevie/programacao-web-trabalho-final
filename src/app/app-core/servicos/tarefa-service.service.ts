import { Injectable } from '@angular/core';
import {Tarefa} from "../model/tarefa";
import {Status} from "../model/status";
import Dexie from "dexie";
import {toNumbers} from "@angular/compiler-cli/src/version_helpers";
import {Soma} from "../model/soma";
@Injectable({
  providedIn: 'root'
})
export class TarefaService extends Dexie {
  tarefas: Dexie.Table<Tarefa,number>;

  constructor() {
    super('TarefaDB');
    this.version(1).stores({
      tarefas: '' +
        '++id, ' +
        'valor,'  +
        'data, ' +
        'hora, ' +
        'imagem',
    });
    this.tarefas = this.table('tarefas');
  }


  async adicionarTarefa(tarefa: Tarefa): Promise<number> {
    return await this.tarefas.add(tarefa);
  }

  async buscartarefas(): Promise<Tarefa[]>{
    return await this.tarefas.toArray();
  }

  async removerTarefa(id:number): Promise<void>{
    return await this.tarefas.delete(id);
  }

  async atualizarTarefa(id: number, tarefa: Tarefa): Promise<number>{
    return await this.tarefas.update(id, tarefa);
  }

}



