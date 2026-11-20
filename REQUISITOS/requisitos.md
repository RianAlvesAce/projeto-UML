# REQUISITOS — SISTEMA DE RESERVA DE LABORATÓRIOS

## 1. Requisitos Funcionais

### RF01 — Consultar laboratórios
Exibir nome, capacidade e situação dos laboratórios.

### RF02 — Realizar reserva
Permitir selecionar laboratório, data, horário e finalidade.

### RF03 — Validar reserva
Não permitir envio com campos obrigatórios vazios.

### RF04 — Confirmar reserva
Informar ao usuário quando a operação for concluída.

### RF05 — Listar reservas
Mostrar as reservas feitas durante a execução da página.

## 2. Requisitos Não Funcionais

### RNF01 — Usabilidade
A organização visual deve permitir identificar facilmente laboratórios, formulário e reservas.

### RNF02 — Responsividade
A página deve continuar utilizável em computadores e celulares.

## 3. Restrições

- Utilizar HTML, CSS e JavaScript.
- Não é necessário banco de dados.
- Não é necessário backend.
- Não é necessária autenticação real.
- O sistema deve funcionar localmente no navegador.

## 4. Laboratórios cadastrados

| Laboratório | Capacidade | Situação |
|---|---|---|
| Laboratório 01 | 30 alunos | Disponível |
| Laboratório 02 | 40 alunos | Indisponível |
| Laboratório 03 | 25 alunos | Disponível |

## 5. Mudança de requisito

Laboratórios com capacidade inferior a 30 alunos não podem ser reservados para aulas regulares.

### Validação
O sistema deve verificar a capacidade do laboratório antes de permitir uma reserva para aula regular.
