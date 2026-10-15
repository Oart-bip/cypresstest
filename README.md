# Atividade 1 — Testes automatizados com Cypress

Automação de testes E2E com Cypress sobre uma aplicação web de **login** e **cadastro de produtos** (criar, editar, listar e excluir).

## Requisitos

- Node.js 18 ou superior
- npm 9 ou superior
- Acesso à internet na primeira instalação (o Cypress baixa o binário do executável)

## Instalação

```bash
npm install
```

## Como executar a aplicação

```bash
npm start
```

A aplicação sobe em `http://localhost:3000`.

Credenciais de teste:

| Campo  | Valor             |
|--------|-------------------|
| E-mail | `admin@teste.com` |
| Senha  | `123456`          |

## Como executar os testes

Os testes precisam da aplicação rodando. Há duas formas.

### Modo interativo (`open`)

Em um terminal:

```bash
npm start
```

Em outro terminal:

```bash
npm run cy:open
```

No Cypress, escolha **E2E Testing**, selecione um navegador e clique no spec desejado.

### Modo headless (`run`)

Em um terminal:

```bash
npm start
```

Em outro terminal:

```bash
npm run cy:run
```



