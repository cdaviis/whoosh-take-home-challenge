class LoginPage {
  selectors = {
    emailField: '[name="email"]',
    passwordField: '[name="password"]',
    loginButton: '.ui__StyledButton-sc-1s61alp-0'
  }
  
  typeEmail(email) {
    cy.get(this.selectors.emailField).type(email)
    return this
  }
  
  typePassword(password) {
    cy.get(this.selectors.passwordField).type(password)
    return this
  }
  
  clickLoginButton() {
    cy.get(this.selectors.loginButton).click()
    return this
  }
  
  userLogin(email, password) {
    this.typeEmail(email)
    this.typePassword(password)
    this.clickLoginButton()
    return this
  }
}

export default LoginPage
