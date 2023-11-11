describe('Blog app', function () {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Doe',
      username: 'vsilno',
      password: 'secret'
    }
    const secondUser = {
      name: 'Joe',
      username: 'vsilno2',
      password: 'secret'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user) 
    cy.request('POST', 'http://localhost:3001/api/users/', secondUser) 
    cy.visit('http://localhost:5173')
  })
  
  it('front page can be opened', function() {
    cy.contains('Login')
  })

  it('login form is shown', function() {
    cy.contains('Login')
    cy.contains('username')
    cy.contains('password')
  })

  describe('login', function() {
    it('fails with wrong password', function() {
        cy.get('#username').type('vsilno')
        cy.get('#password').type('wrong')
        cy.get('[type="submit"]').click()

        cy.contains('invalid username or password')
        cy.get('.error').contains('invalid')
      })

      it('succeeds with valid credentials', function () {
        cy.get('#username').type('vsilno')
        cy.get('#password').type('secret')
        cy.get('[type="submit"]').click()

        cy.contains('logged in as')
      })  
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3001/api/login', {
        username: 'vsilno', password: 'secret'
      }).then(response => {
        localStorage.setItem('loggedUser', JSON.stringify(response.body))
        cy.visit('http://localhost:5173')
      })
    })

    it('a new blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('new crypress blog')
      cy.get('#author').type('Peter Pan')
      cy.get('#url').type('www.peter.com')
      cy.contains('create').click()

      cy.contains('new crypress blog')
    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.contains('new blog').click()
        cy.get('#title').type('new crypress blog')
        cy.get('#author').type('Peter Pan')
        cy.get('#url').type('www.peter.com')
        cy.contains('create').click()
      })

      it('can be liked', function () {
        cy.get('.show').click()
        cy.contains('likes 0')
        cy.get('.like').click()
        cy.contains('likes 1')
      })

      it('can be deleted by user', function () {
        cy.get('.show').click()
        cy.contains('delete').click()
        cy.contains('new crypress blog').should('not.exist')
      })

      it('shows a delete button to creator only', function () {
        cy.contains('logout').click()
        cy.request('POST', 'http://localhost:3001/api/login', {
          username: 'vsilno2', password: 'secret'
        }).then(response => {
          localStorage.setItem('loggedUser', JSON.stringify(response.body))
          cy.visit('http://localhost:5173')
        })
        cy.get('.show').click()
        cy.contains('delete').should('not.exist')
      })
    })

    describe('and several blogs exist', function () {
      beforeEach(() => {
        cy.createBlog({ title: 'first blog', author: 'author', url: 'www.blog.com', likes: 3 })
        cy.createBlog({ title: 'second blog', author: 'author', url: 'www.blog.com', likes: 2 })
        cy.createBlog({ title: 'third blog', author: 'author', url: 'www.blog.com', likes: 1 })
      })

      it.only('shows blogs sorted by most liked', () => {
        cy.get('.blog').eq(0).should('contain', 'first blog')
        cy.get('.blog').eq(1).should('contain', 'second blog')
        cy.get('.blog').eq(2).should('contain', 'third blog')
      })
    })
  })
})