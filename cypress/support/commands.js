Cypress.Commands.add('fillMandatoryFieldsAndSubmit', userData => {

    const backupUserData = {
        'firstName': 'Anônimo',
        'lastName': 'Ominôna',
        'email': 'naotem@naotem.com',
        'textArea': 'standard padrão default'
    }  
    
    if(userData == undefined || userData.email == ' '){
        userData = backupUserData
    }
    
    cy
        .get('[id="firstName"]')
        .type(userData.firstName, {'delay': 20})
        .should('have.value', userData.firstName)

    cy
        .get('[id="lastName"]')
        .type(userData.lastName, {'delay': 20})
        .should('have.value', userData.lastName)

    cy
        .get('[id="email"]')
        .type(userData.email, {'delay': 20})
        .should('have.value', userData.email)

    cy
        .get('[id="open-text-area"]')
        .type(userData.textArea)
    
    cy
        .contains('button', 'Enviar')
        .click()
})