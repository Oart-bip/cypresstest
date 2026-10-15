describe('CT04 - Edição de produto', () => {
  beforeEach(() => {
    cy.clearLocalStorage()
    cy.login()
    cy.cadastrarProduto({ nome: 'Livro de Testes', preco: 59.9, categoria: 'Livros' })
  })

  it('altera nome e preço de um produto já cadastrado', () => {
    cy.getByCy('produto-editar').click()

    cy.getByCy('produto-form-titulo').should('have.text', 'Editar produto')
    cy.getByCy('produto-nome').should('have.value', 'Livro de Testes')

    cy.cadastrarProduto({ nome: 'Livro de Testes - 2ª Edição', preco: 79.9 })

    cy.getByCy('produto-sucesso')
      .should('be.visible')
      .and('contain.text', 'Produto atualizado com sucesso.')
    cy.getByCy('produtos-total').should('have.text', '1')
    cy.getByCy('produto-item-nome').should('have.text', 'Livro de Testes - 2ª Edição')
    cy.getByCy('produto-item-preco').invoke('text').should('match', /79,90/)
    cy.getByCy('produto-form-titulo').should('have.text', 'Novo produto')
  })
})
