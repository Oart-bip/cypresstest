describe('CT02 - Login com credenciais inválidas', () => {
  beforeEach(() => {
    cy.clearLocalStorage()
  })

  it('rejeita senha incorreta e mantém o usuário na tela de login', () => {
    cy.login('admin@teste.com', 'senha-errada')

    cy.getByCy('login-erro')
      .should('be.visible')
      .and('contain.text', 'E-mail ou senha inválidos.')
    cy.url().should('include', '/login.html')
    cy.url().should('not.include', '/produtos.html')
    cy.getByCy('login-form').should('be.visible')
    cy.window().then((janela) => {
      expect(janela.localStorage.getItem('sessao')).to.be.null
    })
  })
})
