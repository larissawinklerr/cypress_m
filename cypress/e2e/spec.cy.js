describe('Sistema de Avaliação de Veículos', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/public/index.html')
  })

  it('Verifica se os elementos estão visíveis', () => {
    cy.contains('h1', 'Avaliação do Veículo').should('be.visible')
    cy.get('#nome').should('be.visible')
    cy.get('#comentario').should('be.visible')
    cy.get('#submit-button').should('be.visible')
    cy.get('#avaliacoes').children().should('have.length', 0)
  })

  it('Verifica os textos e atributos dos campos', () => {
    cy.get('#submit-button').should('contain', 'Enviar Avaliação')
    cy.get('#nome').should('have.attr', 'placeholder', 'Digite seu nome')
    cy.get('#comentario').should('have.attr', 'placeholder', 'Descreva sua experiência com o veículo...')
  })

  it('Envia avaliação corretamente', () => {
    cy.get('#nome').type('Larissa')
    cy.get('#comentario').type('Carro estava ótimo!')
    cy.get('#submit-button').click()

    cy.get('#loading').should('be.visible')
    cy.wait(3000)

    cy.get('#loading').should('not.be.visible')
    cy.get('#avaliacoes').should('contain', 'Larissa: Carro estava ótimo!')
  })

  it('Tenta enviar sem nome e verifica o alerta', () => {
    cy.get('#comentario').type('Comentário sem nome')
    cy.get('#submit-button').click()

    cy.on('window:alert', (txt) => {
      expect(txt).to.contains('Por favor, preencha todos os campos.')
    })
  })

  it('Tenta enviar sem comentário e verifica o alerta', () => {
    cy.get('#nome').type('Maria')
    cy.get('#submit-button').click()

    cy.on('window:alert', (txt) => {
      expect(txt).to.contains('Por favor, preencha todos os campos.')
    })
  })
})
