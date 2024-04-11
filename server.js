import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const listaDeTarefas = [
    {
        id: 0,
        tarefa: 'estudar',
        concluido: false
    },
    {
        id: 1,
        tarefa: 'trabalhar',
        concluido: false
    }
]

app.get('/buscarTarefas', (requisicao, resposta) => {
    resposta.status(200).json(listaDeTarefas)
})

app.get('/buscarTarefa/:id', (requisicao, resposta) => {
    const id = requisicao.params.id;
    const tarefa = listaDeTarefas.filter(tarefa => tarefa.id == id)
    resposta.status(200).json(tarefa);
})

app.post('/criar-tarefa', (requisicao, resposta) => {
    const id = requisicao.body.id
    const nomeTarefa = requisicao.body.tarefa
    const concluido = requisicao.body.concluido
    const tarefa = {
        id,
        tarefa: nomeTarefa,
        concluido,
    }
    listaDeTarefas.push(tarefa);
    resposta.status(200).json(tarefa);
})

app.delete('/deletar-tarefa/:id', (requisicao, resposta) => {
    const id = requisicao.params.id;
    const tarefaASerRemovida = listaDeTarefas.filter(tarefa => tarefa.id == id);
    console.log(tarefaASerRemovida);
    const index = listaDeTarefas.indexOf(tarefaASerRemovida[0]);
    if(index >= 0) {
        listaDeTarefas.splice(index, 1);
        console.log(index);
        resposta.status(204).send('deletado com sucesso!')
    }
    resposta.status(404).send('Não foi encontrado a tarefa!')
})

app.listen('3000', () => {
    console.log('servidor rodando')
})