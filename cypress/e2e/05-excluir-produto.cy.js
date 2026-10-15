describe('CT05 - Exclusão de produto', () => {
  beforeEach(() => {
    cy.clearLocalStorage()
    cy.login()
    cy.cadastrarProduto({ nome: 'Café Especial', preco: 32.5, categoria: 'Alimentos' })
    cy.cadastrarProduto({ nome: 'Chocolate Amargo', preco: 12, categoria: 'Alimentos' })
  })

  it('remove apenas o produto selecionado da listagem', () => {
    cy.getByCy('produtos-total').should('have.text', '2')

    cy.getByCy('produto-item')
      .contains('[data-cy="produto-item"]', 'Café Especial')
      .find('[data-cy="produto-excluir"]')
      .click()

    cy.getByCy('produto-sucesso')
      .should('be.visible')
      .and('contain.text', 'Produto excluído com sucesso.')
    cy.getByCy('produtos-total').should('have.text', '1')
    cy.getByCy('produto-item').should('have.length', 1)
    cy.getByCy('produto-item-nome').should('have.text', 'Chocolate Amargo')
    cy.getByCy('produto-item-nome').should('not.contain.text', 'Café Especial')
  })
})
