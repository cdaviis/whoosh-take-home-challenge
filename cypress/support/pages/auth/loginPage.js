class LoginPage {
  emailField() {
    return cy.get('[name="email"]')
  }
  
  passwordField() {
    return cy.get('[name="password"]')
  }
  
  loginButton() {
    return cy.get('.ui__StyledButton-sc-1s61alp-0')
  }
  
  userLogin(email, password) {
    this.emailField().type(email)
    this.passwordField().type(password)
    this.loginButton().click()
    return this
  }
}

export default LoginPage
