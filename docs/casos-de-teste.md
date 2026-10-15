# Casos de teste

Sistema sob teste: aplicação web de gestão de produtos, com tela de login (`/login.html`) e tela de cadastro de produtos (`/produtos.html`).

Credenciais válidas: `admin@teste.com` / `123456`.

Todos os casos usam seletores `data-cy` e possuem ao menos duas asserções significativas.

## Visão geral

| ID   | Área               | Título                                       | Arquivo                                  |
|------|--------------------|----------------------------------------------|------------------------------------------|
| CT01 | Autenticação       | Login com credenciais válidas                | `cypress/e2e/01-login-valido.cy.js`      |
| CT02 | Autenticação       | Login com credenciais inválidas              | `cypress/e2e/02-login-invalido.cy.js`    |
| CT03 | Cadastro principal | Cadastro de produto                          | `cypress/e2e/03-cadastrar-produto.cy.js` |
| CT04 | Cadastro principal | Edição de produto                            | `cypress/e2e/04-editar-produto.cy.js`    |
| CT05 | Cadastro principal | Exclusão de produto                          | `cypress/e2e/05-excluir-produto.cy.js`   |

---

## CT01 — Login com credenciais válidas

**Objetivo:** garantir que um usuário com credenciais corretas acessa a área de produtos.

**Pré-condições:** nenhuma sessão ativa (`localStorage` limpo).

**Passos:**
1. Acessar `/login.html`.
2. Preencher `login-email` com `admin@teste.com`.
3. Preencher `login-senha` com `123456`.
4. Clicar em `login-submit`.

**Resultado esperado:** o usuário é redirecionado para `/produtos.html`, seu e-mail aparece no cabeçalho e a lista começa vazia.

**Asserções:**
- a URL contém `/produtos.html`
- `usuario-logado` contém o texto `admin@teste.com`
- `logout-btn` está visível
- `produtos-total` exibe `0`
- `produtos-vazio` está visível

---

## CT02 — Login com credenciais inválidas

**Objetivo:** garantir que credenciais incorretas são rejeitadas sem criar sessão.

**Pré-condições:** nenhuma sessão ativa.

**Passos:**
1. Acessar `/login.html`.
2. Preencher `login-email` com `admin@teste.com`.
3. Preencher `login-senha` com `senha-errada`.
4. Clicar em `login-submit`.

**Resultado esperado:** é exibida a mensagem de erro, o usuário permanece na tela de login e nenhuma sessão é gravada.

**Asserções:**
- `login-erro` está visível e contém `E-mail ou senha inválidos.`
- a URL continua em `/login.html` e não contém `/produtos.html`
- `login-form` continua visível
- o `localStorage` não possui a chave `sessao`

---

## CT03 — Cadastro de produto

**Objetivo:** garantir que um produto válido é cadastrado e aparece na listagem.

**Pré-condições:** usuário autenticado, sem produtos cadastrados.

**Passos:**
1. Preencher `produto-nome` com `Notebook Gamer`.
2. Preencher `produto-preco` com `4599.9`.
3. Selecionar `Eletrônicos` em `produto-categoria`.
4. Clicar em `produto-salvar`.

**Resultado esperado:** o sistema confirma o cadastro e o produto aparece na tabela com nome, preço formatado em reais e categoria corretos.

**Asserções:**
- `produto-sucesso` visível com `Produto cadastrado com sucesso.`
- `produtos-total` exibe `1`
- existe exatamente um `produto-item`
- `produto-item-nome` é `Notebook Gamer`
- `produto-item-categoria` é `Eletrônicos`
- `produto-item-preco` contém `4.599,90`
- `produtos-vazio` não está visível

---

## CT04 — Edição de produto

**Objetivo:** garantir que os dados de um produto existente podem ser alterados.

**Pré-condições:** usuário autenticado com o produto `Livro de Testes` (R$ 59,90, categoria Livros) cadastrado.

**Passos:**
1. Clicar em `produto-editar`.
2. Conferir que o formulário entra em modo de edição com os dados atuais.
3. Alterar `produto-nome` para `Livro de Testes - 2ª Edição`.
4. Alterar `produto-preco` para `79.9`.
5. Clicar em `produto-salvar`.

**Resultado esperado:** o produto é atualizado sem duplicar registros e o formulário volta ao modo de cadastro.

**Asserções:**
- `produto-form-titulo` é `Editar produto` ao iniciar a edição
- `produto-nome` vem preenchido com `Livro de Testes`
- `produto-sucesso` visível com `Produto atualizado com sucesso.`
- `produtos-total` continua `1`
- `produto-item-nome` é `Livro de Testes - 2ª Edição`
- `produto-item-preco` contém `79,90`
- `produto-form-titulo` volta a `Novo produto`

---

## CT05 — Exclusão de produto

**Objetivo:** garantir que a exclusão remove somente o produto selecionado.

**Pré-condições:** usuário autenticado com os produtos `Café Especial` e `Chocolate Amargo` cadastrados.

**Passos:**
1. Conferir que a lista possui dois produtos.
2. Na linha de `Café Especial`, clicar em `produto-excluir`.

**Resultado esperado:** apenas `Café Especial` é removido; `Chocolate Amargo` permanece na lista.

**Asserções:**
- `produtos-total` é `2` antes da exclusão
- `produto-sucesso` visível com `Produto excluído com sucesso.`
- `produtos-total` passa a `1`
- existe exatamente um `produto-item`
- `produto-item-nome` é `Chocolate Amargo`
- `produto-item-nome` não contém `Café Especial`
