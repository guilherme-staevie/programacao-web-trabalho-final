import {Status} from "./status";


export class Tarefa {

  id?: number;
  titulo: number;
  dataInicio: string;
  dataConclusao: string;
  status: Status;
  descricao: string;
  imagem?: string;
  constructor(valor: number, dataIni: string,
              dataCon: string, desc: string,
              sta: Status, id?: number, imagem?: string) {
    this.titulo= parseFloat(valor.toFixed(2));
    this.dataInicio= dataIni;
    this.dataConclusao = dataCon;
    this.descricao= desc;
    this.status = sta;
    this.id = id;
    this.imagem = imagem;
  }

}
