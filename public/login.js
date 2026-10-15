const USUARIO = { email: 'admin@teste.com', senha: '123456' }

const form = document.querySelector('[data-cy="login-form"]')
const campoEmail = document.querySelector('[data-cy="login-email"]')
const campoSenha = document.querySelector('[data-cy="login-senha"]')
const caixaErro = document.querySelector('[data-cy="login-erro"]')

function mostrarErro(mensagem) {
  caixaErro.textContent = mensagem
  caixaErro.classList.remove('oculto')
}

form.addEventListener('submit', (evento) => {
  evento.preventDefault()
  caixaErro.classList.add('oculto')

  const email = campoEmail.value.trim()
  const senha = campoSenha.value

  if (!email || !senha) {
    mostrarErro('Informe e-mail e senha.')
    return
  }

  if (email !== USUARIO.email || senha !== USUARIO.senha) {
    mostrarErro('E-mail ou senha inválidos.')
    return
  }

  localStorage.setItem('sessao', JSON.stringify({ email }))
  window.location.href = '/produtos.html'
})
