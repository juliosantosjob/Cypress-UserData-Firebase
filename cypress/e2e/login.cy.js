/// <reference types='cypress' />

import LoginPage from '../pages/login.page'

describe('Autenticação', () => {

  beforeEach(() => { 
    LoginPage.goToLoginPage() 
  })

  afterEach(() => cy.screenshot())

  it('01 Cenário: Login com sucesso', () => {
    LoginPage.fillCredents('standard_user', 'secret_sauce')
    LoginPage.submitLogin()
    LoginPage.beLogged()
  })

  it('02 Cenário: Login com username inválido', () => {
    LoginPage.fillCredents('invalid_user', 'secret_sauce')
    LoginPage.submitLogin()
    LoginPage.verifyLoginFailed(
      'Epic sadface: Username and password do not match any user in this service'
    )
  })

  it('03 Cenário: Login com password inválido', () => {
    LoginPage.fillCredents('standard_user', 'invalid_password')
    LoginPage.submitLogin()
    LoginPage.verifyLoginFailed(
      'Epic sadface: Username and password do not match any user in this service'
    )
  })

  it('04 Cenário: Login com username vazio', () => {
    LoginPage.fillCredents('', 'invalid_password')
    LoginPage.submitLogin()
    LoginPage.verifyLoginFailed('Epic sadface: Username is required')
  })

  it('05 Cenário: Login com password vazio', () => {
    LoginPage.fillCredents('standard_user', '')
    LoginPage.submitLogin()
    LoginPage.verifyLoginFailed('Epic sadface: Password is required')
  })

  it('06 Cenário: Login com formulário vazio', () => {
    LoginPage.fillCredents('', '')
    LoginPage.submitLogin()
    LoginPage.verifyLoginFailed('Epic sadface: Username is required')
  })

  it('07 Cenário: Login com usuario bloqueado', () => {
    LoginPage.fillCredents('locked_out_user', 'secret_sauce')
    LoginPage.submitLogin()
    LoginPage.verifyLoginFailed('Epic sadface: Sorry, this user has been locked out.')
  })

  it('08 Cenário: Logout do Usuário ', () => {
    LoginPage.doLogin('standard_user', 'secret_sauce')
    LoginPage.doLogout()
    LoginPage.goToLoginPage()
  })
})