import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { Soma } from '../model/soma';

@Injectable({
  providedIn: 'root'
})
export class SomaService extends Dexie {
  somas: Dexie.Table<Soma, number>;

  constructor() {
    super('TarefaDB');
    this.version(1).stores({
      somas: '++id, total'
    });
    this.somas = this.table('somas');
  }

  async salvarSoma(soma: Soma): Promise<number> {
    return await this.somas.add(soma);
  }

  async buscarUltimaSoma(): Promise<Soma> {
    const ultimaSoma = await this.somas.orderBy('id').last();
    return ultimaSoma || new Soma(0);
  }
}
