describe('CT03 - Cadastro de produto', () => {
  beforeEach(() => {
    cy.clearLocalStorage()
    cy.login()
  })

  it('cadastra um produto válido e o exibe na listagem', () => {
    cy.cadastrarProduto({ nome: 'Notebook Gamer', preco: 4599.9, categoria: 'Eletrônicos' })

    cy.getByCy('produto-sucesso')
      .should('be.visible')
      .and('contain.text', 'Produto cadastrado com sucesso.')
    cy.getByCy('produtos-total').should('have.text', '1')
    cy.getByCy('produto-item').should('have.length', 1)
    cy.getByCy('produto-item-nome').should('have.text', 'Notebook Gamer')
    cy.getByCy('produto-item-categoria').should('have.text', 'Eletrônicos')
    cy.getByCy('produto-item-preco').invoke('text').should('match', /4\.599,90/)
    cy.getByCy('produtos-vazio').should('not.be.visible')
  })
})
