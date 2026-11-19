Sistema de Reserva de Laboratórios

 Sobre o projeto

Este projeto consiste no desenvolvimento de um protótipo web para um Sistema de Reserva de Laboratórios, desenvolvido como atividade prática da disciplina de Maturidade em Desenvolvimento de Software, da UNINASSAU.

O sistema tem como finalidade permitir que professores consultem laboratórios, realizem reservas e visualizem as reservas feitas durante a execução da página.

 Objetivo

Transformar os requisitos e diagramas UML em um protótipo web funcional, utilizando HTML, CSS e JavaScript, aplicando conceitos de Engenharia de Software.

Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript

Requisitos do sistema

O sistema possui cinco requisitos funcionais:

- RF01 – Consultar laboratórios: exibir nome, capacidade e situação dos laboratórios.
- RF02 – Realizar reserva: selecionar laboratório, data, horário e finalidade.
- RF03 – Validar reserva: não permitir o envio com campos obrigatórios vazios.
- RF04 – Confirmar reserva: informar ao usuário quando a operação for concluída.
- RF05 – Listar reservas: mostrar as reservas feitas durante a execução da página.

Requisitos não funcionais

- RNF01 – Usabilidade: facilitar a identificação dos laboratórios, formulário e reservas.
- RNF02 – Responsividade: permitir a utilização em computadores e celulares.

 Diagramas UML

O projeto possui dois diagramas principais:

- Diagrama de Casos de Uso: representa o ator Professor e as funcionalidades disponíveis no sistema.
- Diagrama de Classes: apresenta as classes Professor, Reserva e Laboratório, seus atributos e relacionamentos.

Os diagramas estão disponíveis nos arquivos:

- "diagrama-casos-de-uso.md"
- "diagrama-de-classes.md"

 Laboratórios cadastrados

Laboratório| Capacidade| Situação
Laboratório 01| 30 alunos| Disponível
Laboratório 02| 40 alunos| Indisponível
Laboratório 03| 25 alunos| Disponível

 Regra de negócio

Laboratórios com capacidade inferior a 30 alunos não podem ser reservados para aulas regulares.

Essa regra deve ser considerada durante a realização e validação das reservas.

Requisitos e restrições da atividade

- Utilizar HTML, CSS e JavaScript.
- Não é necessário banco de dados.
- Não é necessário backend.
- Não é necessária autenticação real.
- O sistema deve funcionar localmente no navegador.

Como executar o projeto

1. Baixe ou clone o repositório.
2. Abra a pasta do projeto.
3. Localize o arquivo "index.html".
4. Abra o arquivo em um navegador.
5. Utilize as funcionalidades disponíveis.

📌 Observações

Os dados dos laboratórios podem ser definidos diretamente no JavaScript. As reservas são exibidas durante a execução da página, sem necessidade de banco de dados.
