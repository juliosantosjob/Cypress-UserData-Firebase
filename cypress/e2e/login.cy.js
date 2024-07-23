/// <reference types='cypress' />

import LoginPage from '../pages/login.page'

describe('Funcionalidade: Autenticação', () => {
  let username, password

  beforeEach(() => {
    LoginPage.openLoginPage()
    LoginPage.getUser('User').then((user) => {
      username = user.username
      password = user.password
    })
  })

  it('01 Cenário: Login com sucesso', () => {
    LoginPage.openLoginPage()
    LoginPage.fillCredents(username, password)
    LoginPage.submit()
    LoginPage.atHome()
  })

  it('02 Cenário: Login com username inválido', () => {
    LoginPage.fillCredents('invalid_user', password)
    LoginPage.submit()
    LoginPage.verifyError(
      'Epic sadface: Username and password do not match any user in this service'
    )
  })

  it('03 Cenário: Login com password inválido', () => {
    LoginPage.fillCredents(username, 'invalid_password')
    LoginPage.submit()
    LoginPage.verifyError(
      'Epic sadface: Username and password do not match any user in this service'
    )
  })

  it('04 Cenário: Login com username vazio', () => {
    LoginPage.fillCredents('', 'invalid_password')
    LoginPage.submit()
    LoginPage.verifyError('Epic sadface: Username is required')
  })

  it('05 Cenário: Login com password vazio', () => {
    LoginPage.fillCredents('standard_user', '')
    LoginPage.submit()
    LoginPage.verifyError('Epic sadface: Password is required')
  })

  it('06 Cenário: Login com formulário vazio', () => {
    LoginPage.fillCredents('', '')
    LoginPage.submit()
    LoginPage.verifyError('Epic sadface: Username is required')
  })

  it('07 Cenário: Login com usuario bloqueado', () => {
    LoginPage.fillCredents('locked_out_user', 'secret_sauce')
    LoginPage.submit()
    LoginPage.verifyError('Epic sadface: Sorry, this user has been locked out.')
  })

  it('08 Cenário: Logout do Usuário ', () => {
    LoginPage.doLogin(username, password)
    LoginPage.doLogout()
    LoginPage.openLoginPage()
  })

  afterEach(() => cy.screenshot())
})