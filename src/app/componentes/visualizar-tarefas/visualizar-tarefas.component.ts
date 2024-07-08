import { Component, OnInit } from '@angular/core';
import {TarefaService} from "../../app-core/servicos/tarefa-service.service";
import {Tarefa} from "../../app-core/model/tarefa";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
declare var $ : any;
import Swal from 'sweetalert2';
import {formatNumber} from "@angular/common";
import {Soma} from "../../app-core/model/soma";
import {SomaService} from "../../app-core/servicos/soma.service";

declare var $: any;

@Component({
  selector: 'app-visualizar-tarefas',
  templateUrl: './visualizar-tarefas.component.html',
  styleUrls: ['./visualizar-tarefas.component.css']
})


export class VisualizarTarefasComponent implements OnInit {

  i: number =0;
  tarefas: any [] =[];
  tarefaVisualizar: any;
  form: FormGroup;
  somaTotal: Soma;

  constructor(private tarefaService: TarefaService,
              private fb: FormBuilder,
              private SomaService: SomaService) {

    this.form = this.fb.group({
      tituloTarefa: [''],
      dataInicioTarefa: [new Date()],
      dataConclusaoTarefa: [''],
      statusTarefa: [''],
      descricaoTarefa: [''],
      id: [0],
      imagem: ['']
    });
    this.somaTotal = new Soma();
  }

  openModal(){
    $('#add-tarefa').modal('show');
  }
  closeModal(){
    $('#add-tarefa').modal('hide');
  }

  salvarFormTarefa() {
    if(this.form.valid){
     const novaTarefa: Tarefa = new Tarefa(
       parseFloat(this.form.value.tituloTarefa),
       this.form.value.dataInicioTarefa,
       this.form.value.dataConclusaoTarefa,
       this.form.value.descricaoTarefa,
       this.form.value.statusTarefa,
       undefined,
       this.form.value.imagem
     );



     console.log('dados da nova tarefa: ',novaTarefa);
     this.tarefaService.adicionarTarefa(novaTarefa).then(reposta => {
       if(reposta > 0){
         Swal.fire('Sucesso', 'Tarefa salva com sucesso!', 'success');
         this.form.reset();
         this.closeModal();
         this.listarTarefas();
         this.atualizarSoma(); // Chamando o método para atualizar a soma no IndexedDB
       }
     }).catch(respostaError => {
       Swal.fire('Não foi dessa vez', 'Não foi possível salvar a tarefa, ' +
         'tente novamente mais tarde', 'error');
       console.log(respostaError);
     })



    }else{
      console.log("CAMPOS INVALIDOS ENCONTRADOS.");
      console.log("DADOS DOS CAMPOS: ", this.form.value);
      Swal.fire('Cuidado', 'Alguns campos do formulário não estão ' +
        'corretos.', 'warning');
      this.marcarTodosComoClicados();
    }
  }

  // Método para atualizar a soma no IndexedDB
  async atualizarSoma() {
    // Buscar todas as tarefas
    const tarefas = await this.tarefaService.buscartarefas();

    // Calcular a soma total dos valores de título das tarefas
    const totalAtualizado = tarefas.reduce((acc, valor) => acc + parseFloat(valor.titulo.toFixed(2)), 0);

    // Salvar a nova soma no IndexedDB
    const novaSoma = new Soma(totalAtualizado);
    await this.SomaService.salvarSoma(novaSoma);

    // Atualizar a variável somaTotal para refletir o valor atualizado
    this.somaTotal.total = totalAtualizado;
  }

  isCampoValido(inputNome: string) : boolean {
    const campo: any = this.form.get(inputNome);
    return campo && campo.touched && campo.invalid;
  }
  marcarTodosComoClicados(){
    Object.values(this.form.controls).forEach(campo => {
      campo.markAsTouched();
    });
  }
  listarTarefas(){
    this.tarefaService.buscartarefas().then(resposta => {
      this.tarefas= resposta;
    });
  }

  setTarefaAtual(tarefa: Tarefa){
    this.tarefaVisualizar= tarefa;
  }

  excluirTarefa(id: number){
    Swal.fire(
      {
        title: 'Tem certeza?',
        text: 'Você não poderá reverter isso!',
        icon: 'warning',
        showCancelButton: true,
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, deletar tarefa!',
        confirmButtonColor: '#3085d6'
      }).then((tipoBotao) => {
        if(tipoBotao.isConfirmed){
          this.tarefaService.removerTarefa(id).then(() => {
            Swal.fire('Deletado!', 'A tarefa foi deletada.', 'success');
            this.listarTarefas();
            this.atualizarSoma(); // Atualiza a soma após excluir a tarefa
          });
        }
    }).catch(error => {
      console.log(error);
      Swal.fire('ERRO!', 'A tarefa não foi deletada.', 'error')
    });
  }

  submitForm(){
    if(this.form.value.id > 0){
      this.editarFormTarefa();
    }else{
      this.salvarFormTarefa();
    }
  }
  carregarDadosTarefa(tarefaEditar: Tarefa){
    this.form.patchValue({
      tituloTarefa: tarefaEditar.titulo,
      dataInicioTarefa: tarefaEditar.dataInicio,
      dataConclusaoTarefa: tarefaEditar.dataConclusao,
      statusTarefa: tarefaEditar.status,
      descricaoTarefa: tarefaEditar.descricao,
      id: tarefaEditar.id,
      imagem: tarefaEditar.imagem
    });
    this.openModal();
  }

  editarFormTarefa(){
    if(this.form.valid){
      const editarTarefa: Tarefa = new Tarefa(
        this.form.value.tituloTarefa,
        this.form.value.dataInicioTarefa,
        this.form.value.dataConclusaoTarefa,
        this.form.value.descricaoTarefa,
        this.form.value.statusTarefa,
        this.form.value.id,
        this.form.value.imagem
      );
      this.tarefaService.atualizarTarefa(this.form.value.id, editarTarefa)
        .then(reposta => {
          if(reposta === 1){
            Swal.fire('Sucesso!','Tarefa editada com sucesso.','success');
            this.form.reset();
            this.closeModal();
            this.listarTarefas();
            this.atualizarSoma(); // Atualiza a soma após editar a tarefa
          }else{
            Swal.fire('Atenção','Nenhuma tarefa encontrada, ou nenhuma alteração' +
              ' necessária', 'info');
          }
        }).catch(error => {
         Swal.fire('Cuidado!', 'Não foi possível editar a tarefa.', 'error');
      });
    }else{
      Swal.fire('Cuidado!', 'Alguns campos estão incorretos', 'warning');
      this.marcarTodosComoClicados();
    }
  }

  onFileChange(event: any){
    const file = event.target.files[0];
    if(file){
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        this.form.patchValue({imagem: loadEvent?.target?.result});
      };
      reader.readAsDataURL(file);
    }
  }

  ngOnInit(): void {
      this.listarTarefas();
      this.atualizarSoma(); // Atualiza a soma inicialmente ao iniciar o componente
  }

}
