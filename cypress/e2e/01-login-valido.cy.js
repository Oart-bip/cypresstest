describe('CT01 - Login com credenciais válidas', () => {
  beforeEach(() => {
    cy.clearLocalStorage()
  })

  it('autentica o usuário e exibe a área de produtos', () => {
    cy.login('admin@teste.com', '123456')

    cy.url().should('include', '/produtos.html')
    cy.getByCy('usuario-logado').should('have.text', 'admin@teste.com')
    cy.getByCy('logout-btn').should('be.visible')
    cy.getByCy('produtos-total').should('have.text', '0')
    cy.getByCy('produtos-vazio').should('be.visible')
  })
})
