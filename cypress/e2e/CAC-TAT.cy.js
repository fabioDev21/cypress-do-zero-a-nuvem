/* estrutura do script de teste
    
    describe('Suíte de testes')
      it('Caso de teste')

*/

describe('Central de atendimento ao cliente TAT', () => {
  
  // beforeEach (comando abaixo serve para carregarmos a página que será utilizada pelos testes)
  beforeEach(() => {
    cy.visit('./src/index.html')
  })

  // teste 1
  it('verifica o título da aplicação', () => {

    // Os comandos podem ser encadeados e alguns comandos podem 'gritar' seus dados adiante, ver encademeamentos em cy
    cy
      .title() // --> pega o título do documento!

      // comando should é uma das formas de asserção, composto por: .should('validação', 'dado p/ comparar')
      .should('be.equal','Central de Atendimento ao Cliente TAT')
  })

  // teste 2
  it('preenche os campos obrigatórios e envia o formulário', () => {
    
    cy
      .get('[id="firstName"]')

      // .as é o alias! Ele é uma forma de apelidar o id que pegou com o get, fica mais fácil solicitá-lo dps com outra cadeia de comandos, é usado da seguinte maneira: cy.get('@userNome')
      .as('userNome')

      // podemos passar muitas opções dentro de um objeto para o comando .type, aqui foi usado o delay
      .type('Jubiscleitos', {'delay': 20})

      // muito importante que, em inputs é preciso validar o valor (value) dele e não o id do input...
      .should('have.value', 'Jubiscleitos')
  
    cy
      .get('[id="lastName"]')
      .type('da Silva', {'delay': 20})
      .should('have.value', 'da Silva')

    cy
      .get('[id="email"]')
      .type('jubis21Silvas@gmail.com',{'delay': 20})
      .should('have.value','jubis21Silvas@gmail.com')  

    cy
      .get('[id="open-text-area"]')
      .type('gosto muito da plataforma, vocês são demais!', {'delay': 20})
      .should('have.value', 'gosto muito da plataforma, vocês são demais!')

    cy
      .get('[class="button"]')
      .click()

    cy
      .get('[class="success"]')
      .should('be.visible')
  })

  // teste 3 
  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {

    cy
      .get('[id="firstName"]')
      .type('Marivaldo', {'delay': 20})
      .should('have.value','Marivaldo')

    cy
      .get('[id="lastName"]')
      .type('Marston Ribeiro', {'delay': 20})
      .should('have.value','Marston Ribeiro')

    cy
      .get('[id="email"]')
      .type('marsRibs.com', {'delay': 20})
      .should('have.value','marsRibs.com')

    cy
      .get('[id="open-text-area"]')
      .type('Não gostei muito... Muito raso, sem nexo e nada legal! Por favor, melhorem.', {'delay': 20})
      .should('have.value', 'Não gostei muito... Muito raso, sem nexo e nada legal! Por favor, melhorem.')
    
    cy
      .get('[class="button"]')
      .click()
    
    cy
      .get('[class="error"]')
      .should('be.visible')

  })

  // teste 4
  it('preenche letras ao invés de números no campo telefone', () => {
    cy
      .get('[id="firstName"]')
      .type('Maanakia', {'delay': 20})
      .should('have.value', 'Maanakia')

    cy
      .get('[id="lastName"]')
      .type('Spencer Lewis', {'delay': 20})
      .should('have.value', 'Spencer Lewis')

    cy
      .get('[id="email"]')
      .type('maanLew@gmail.com', {'delay': 20})
      .should('have.value','maanLew@gmail.com')

    cy
      .get('[id="phone"]')
      .type('abcdefgh', {'delay': 20})
      .should('not.have.value')

  })

  // teste 4
  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy
      .get('[id="firstName"]')
      .type('Torisvalda', {'delay': 20})
      .should('have.value','Torisvalda')

    cy
      .get('[id="lastName"]')
      .type('Hatakaguri', {'delay': 20})
      .should('have.value','Hatakaguri')
  
    cy
      .get('[id="email"]')
      .type('toriguri@hotmail.com', {'delay': 20})
      .should('have.value','toriguri@hotmail.com')

    cy
      .get('[id="phone-checkbox"]')
      .check()
      .should('be.checked')

    cy
      .get('[id="open-text-area"]')
      .type('i liked the app, thx!', {'delay': 20})
      .should('have.value', 'i liked the app, thx!')

    cy
      .get('[class="button"]')
      .click()
    
    cy
      .get('[class="error"]')
      .should('be.visible')
  
  })

  //teste 5
  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {

    cy
      .get('[id="firstName"]')
      .as('userNome')
      .type('Joe', {'delay': 20})
      .should('have.value', 'Joe')

    cy
      .get('[id="lastName"]')
      .as('userSobrenome')
      .type('Viewtful', {'delay': 20})
      .should('have.value', 'Viewtful')

    cy
      .get('[id="email"]')
      .as('userEmail')
      .type('daThruViewtfulJoe@gmail.com', {'delay': 20})
      .should('have.value', 'daThruViewtfulJoe@gmail.com')

    cy
      .get('[id="open-text-area"]')
      .as('userOpinion')
      .type("id really liked this app and courses that'll have, so glad to came up here with a good base about cypress :D", {'delay': 20})
      .should('have.value',"id really liked this app and courses that'll have, so glad to came up here with a good base about cypress :D")

    // parte da exclusão de valores e validação
    cy
      .get('@userNome')
      .clear()
      .should('have.value','')

    cy
      .get('@userSobrenome')
      .clear()
      .should('have.value','')

    cy
      .get('@userEmail')
      .clear()
      .should('have.value','')

    cy
      .get('@userOpinion')
      .clear()
      .should('have.value','')
  })

  // teste 6
  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
  cy
    .get('[class="button"]')
    .click()
  
  cy
    .get('[class="error"]')
    .should('be.visible')
  })
})