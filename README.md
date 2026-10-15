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

### Tudo em um comando

O comando abaixo sobe a aplicação, espera ela responder, executa `cypress run` e encerra o servidor ao final:

```bash
npm test
```

## Configuração

O arquivo `cypress.config.js` define:

- `baseUrl`: `http://localhost:3000`
- vídeos da execução em `evidencias/videos`
- screenshots de falhas em `evidencias/screenshots`

## Casos de teste automatizados

| ID   | Arquivo                                     | Funcionalidade                  |
|------|---------------------------------------------|---------------------------------|
| CT01 | `cypress/e2e/01-login-valido.cy.js`         | Autenticação: login válido      |
| CT02 | `cypress/e2e/02-login-invalido.cy.js`       | Autenticação: login inválido    |
| CT03 | `cypress/e2e/03-cadastrar-produto.cy.js`    | Cadastro de produto             |
| CT04 | `cypress/e2e/04-editar-produto.cy.js`       | Edição de produto               |
| CT05 | `cypress/e2e/05-excluir-produto.cy.js`      | Exclusão de produto             |

A descrição completa de cada caso (pré-condições, passos e resultado esperado) está em [`docs/casos-de-teste.md`](docs/casos-de-teste.md).

## Convenções

- Todos os elementos são selecionados **exclusivamente** por atributos `data-cy`, por meio do comando customizado `cy.getByCy('nome')`.
- Cada teste possui no mínimo duas asserções significativas sobre o comportamento do sistema.
- Cada teste é independente: o `localStorage` é limpo antes de cada execução.
- Comandos reutilizáveis (`login`, `cadastrarProduto`) ficam em `cypress/support/commands.js`.

## Estrutura do projeto

```
.
├── cypress/
│   ├── e2e/                  testes automatizados
│   └── support/              comandos customizados
├── docs/
│   └── casos-de-teste.md     documentação dos casos
├── evidencias/               vídeo e print da execução do cypress run
├── public/                   aplicação testada
├── cypress.config.js
├── package.json
└── server.js                 servidor estático da aplicação
```

## Evidências

Após executar `npm test` (ou `npm run cy:run`), o vídeo de cada spec é gravado em `evidencias/videos`. Salve também um print do terminal com todos os testes passando em `evidencias/`.

## Entrega

- Tag: `atividade-1`
- Histórico de commits com contribuições de todos os integrantes da equipe
