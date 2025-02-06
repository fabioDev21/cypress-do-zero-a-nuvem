it.only('testa a página da política de privacidade de forma independente', () => {
    cy.visit('./src/privacy.html')
    
    cy.title()
      .should('be.equal', 'Central de Atendimento ao Cliente TAT - Política de Privacidade')

    cy.contains('p', 'Utilzamos as tecnologias HTML, CSS e JavaScript, para simular uma aplicação real.')
        .should('be.visible')

  })