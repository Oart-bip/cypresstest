Cypress.Commands.add('getByCy', (nome) => {
  return cy.get(`[data-cy="${nome}"]`)
})

Cypress.Commands.add('login', (email = 'admin@teste.com', senha = '123456') => {
  cy.visit('/login.html')
  cy.getByCy('login-email').type(email)
  cy.getByCy('login-senha').type(senha)
  cy.getByCy('login-submit').click()
})

Cypress.Commands.add('cadastrarProduto', ({ nome, preco, categoria }) => {
  cy.getByCy('produto-nome').clear().type(nome)
  cy.getByCy('produto-preco').clear().type(String(preco))
  if (categoria) {
    cy.getByCy('produto-categoria').select(categoria)
  }
  cy.getByCy('produto-salvar').click()
})
