# Controle de Caixa

Este projeto foi feito com [Angular CLI](https://github.com/angular/angular-cli) versão 14.0.0.

# Propósito

Este trabalho tem o propósito de criar uma aplicação web que faça o registro de caixa, onde são 
inseridos entradas e saídas de dinheiro, e mostre também o balanço (total em caixa).

# Usuário alvo

Essa aplicação se destina para usuários que estão na ponta de caixa de pequenos comércios,
pois ele irá facilitar o controle de fluxo financeiro, dispensando assim os famosos "caderninhos" de anotação. 

# Arquitetura

O projeto consiste em uma página HTML contento uma lista das operações de crédito e débito, bem como botão para fazer
depósitos e retiradas, é possível também editar valores já incluídos, ou excluí-los.
Os principais compoentes são services para atualizar os valores dos débitos e créditos no banco de dados, e também service para atualizar
uma tabela contando os saldos após cada operação, sendo esse saldo o resultado do balanço do caixa (créditos menos débitos).
Há modulos específicos para as operações de crédito e débito, bem como modulo para o salto toral.

# Tecnologias utilizadas

Para isso foram utilizados as linguagem HTML5, css, type script, também foi utilizado framework angualar e o banco indexDB para presistência de dados

# Desafios e Soluçoes

O principal desafio foi entender a estrutura do angular, pois apesar de uma ferramente poderosa, existe uma curva de aprendizagem,
para contornar isso foi utilizado leitura da documentação e busca na internet de como resolver problemas específicos, como manupulação de variáveis e conexão com DB.

# Resultados e Melhorias Futuras

De forma geral o resultado esperado foi atingido, o sistema computa corretamente as entradas e saída de dinheiros, bem como mostra o balanço atual do caixa,
fazendo o correto processo de CRUD com o DB.
Para o futuro pode-se implementar novas funcionalidades como inclussão da opção de estorno de operações erradas, opções de fechamento diário, analise dos fechamentos de forma mensal, semestral e anual, entre outras.

