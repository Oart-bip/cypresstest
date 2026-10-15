const sessao = JSON.parse(localStorage.getItem('sessao') || 'null')

if (!sessao) {
  window.location.href = '/login.html'
}

const form = document.querySelector('[data-cy="produto-form"]')
const titulo = document.querySelector('[data-cy="produto-form-titulo"]')
const campoNome = document.querySelector('[data-cy="produto-nome"]')
const campoPreco = document.querySelector('[data-cy="produto-preco"]')
const campoCategoria = document.querySelector('[data-cy="produto-categoria"]')
const botaoSalvar = document.querySelector('[data-cy="produto-salvar"]')
const botaoCancelar = document.querySelector('[data-cy="produto-cancelar"]')
const caixaErro = document.querySelector('[data-cy="produto-erro"]')
const caixaSucesso = document.querySelector('[data-cy="produto-sucesso"]')
const lista = document.querySelector('[data-cy="produtos-lista"]')
const total = document.querySelector('[data-cy="produtos-total"]')
const vazio = document.querySelector('[data-cy="produtos-vazio"]')
const usuario = document.querySelector('[data-cy="usuario-logado"]')
const botaoSair = document.querySelector('[data-cy="logout-btn"]')

let produtos = JSON.parse(localStorage.getItem('produtos') || '[]')
let idEmEdicao = null

if (sessao) {
  usuario.textContent = sessao.email
}

function salvarProdutos() {
  localStorage.setItem('produtos', JSON.stringify(produtos))
}

function formatarPreco(valor) {
  return Number(valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

function esconderMensagens() {
  caixaErro.classList.add('oculto')
  caixaSucesso.classList.add('oculto')
}

function mostrarErro(mensagem) {
  esconderMensagens()
  caixaErro.textContent = mensagem
  caixaErro.classList.remove('oculto')
}

function mostrarSucesso(mensagem) {
  esconderMensagens()
  caixaSucesso.textContent = mensagem
  caixaSucesso.classList.remove('oculto')
}

function limparFormulario() {
  form.reset()
  idEmEdicao = null
  titulo.textContent = 'Novo produto'
  botaoSalvar.textContent = 'Cadastrar'
  botaoCancelar.classList.add('oculto')
}

function criarCelula(texto, cy) {
  const td = document.createElement('td')
  td.textContent = texto
  td.setAttribute('data-cy', cy)
  return td
}

function criarBotao(texto, cy, classe, aoClicar) {
  const botao = document.createElement('button')
  botao.type = 'button'
  botao.textContent = texto
  botao.className = `pequeno ${classe}`.trim()
  botao.setAttribute('data-cy', cy)
  botao.addEventListener('click', aoClicar)
  return botao
}

function renderizar() {
  lista.innerHTML = ''

  produtos.forEach((produto) => {
    const linha = document.createElement('tr')
    linha.setAttribute('data-cy', 'produto-item')

    const acoes = document.createElement('td')
    acoes.className = 'acoes'
    acoes.appendChild(criarBotao('Editar', 'produto-editar', 'secundario', () => iniciarEdicao(produto.id)))
    acoes.appendChild(criarBotao('Excluir', 'produto-excluir', 'perigo', () => excluir(produto.id)))

    linha.appendChild(criarCelula(produto.nome, 'produto-item-nome'))
    linha.appendChild(criarCelula(formatarPreco(produto.preco), 'produto-item-preco'))
    linha.appendChild(criarCelula(produto.categoria, 'produto-item-categoria'))
    linha.appendChild(acoes)

    lista.appendChild(linha)
  })

  total.textContent = String(produtos.length)
  vazio.classList.toggle('oculto', produtos.length > 0)
}

function iniciarEdicao(id) {
  const produto = produtos.find((item) => item.id === id)
  if (!produto) return

  idEmEdicao = id
  campoNome.value = produto.nome
  campoPreco.value = produto.preco
  campoCategoria.value = produto.categoria
  titulo.textContent = 'Editar produto'
  botaoSalvar.textContent = 'Salvar alterações'
  botaoCancelar.classList.remove('oculto')
  esconderMensagens()
}

function excluir(id) {
  produtos = produtos.filter((item) => item.id !== id)
  salvarProdutos()
  renderizar()
  if (idEmEdicao === id) limparFormulario()
  mostrarSucesso('Produto excluído com sucesso.')
}

form.addEventListener('submit', (evento) => {
  evento.preventDefault()

  const nome = campoNome.value.trim()
  const preco = parseFloat(campoPreco.value)
  const categoria = campoCategoria.value

  if (!nome) {
    mostrarErro('O nome do produto é obrigatório.')
    return
  }

  if (Number.isNaN(preco) || preco <= 0) {
    mostrarErro('Informe um preço maior que zero.')
    return
  }

  if (idEmEdicao !== null) {
    produtos = produtos.map((item) =>
      item.id === idEmEdicao ? { ...item, nome, preco, categoria } : item
    )
    salvarProdutos()
    renderizar()
    limparFormulario()
    mostrarSucesso('Produto atualizado com sucesso.')
    return
  }

  produtos.push({ id: Date.now(), nome, preco, categoria })
  salvarProdutos()
  renderizar()
  limparFormulario()
  mostrarSucesso('Produto cadastrado com sucesso.')
})

botaoCancelar.addEventListener('click', () => {
  limparFormulario()
  esconderMensagens()
})

botaoSair.addEventListener('click', () => {
  localStorage.removeItem('sessao')
  window.location.href = '/login.html'
})

renderizar()
