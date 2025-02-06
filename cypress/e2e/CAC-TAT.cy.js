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

      // podemos pass ar muitas opções dentro de um objeto para o comando .type, aqui foi usado o delay
      .type('Jubiscleitos')

      // muito importante que, em inputs é preciso validar o valor (value) dele e não o id do input...
      .should('have.value', 'Jubiscleitos')
  
    cy
      .get('[id="lastName"]')
      .type('da Silva')
      .should('have.value', 'da Silva')

    cy
      .get('[id="email"]')
      .type('jubis21Silvas@gmail.com',{'delay': 20})
      .should('have.value','jubis21Silvas@gmail.com')  

    cy
      .get('[id="open-text-area"]')
      .type('gosto muito da plataforma, vocês são demais!')
      .should('have.value', 'gosto muito da plataforma, vocês são demais!')

    cy
      .contains('button', 'Enviar')
      .click()

    cy
      .contains("Mensagem enviada com sucesso.")
      .should('be.visible')
  })

  // teste 3 
  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {

    cy
      .get('#firstName')
      .type('Marivaldo')
      .should('have.value','Marivaldo')

    cy
      .get('#lastName')
      .type('Marston Ribeiro')
      .should('have.value','Marston Ribeiro')

    cy
      .get('#email')
      .type('marsRibs.com')
      .should('have.value','marsRibs.com')

    cy
      .get('#open-text-area')
      .type('Não gostei muito... Muito raso, sem nexo e nada legal! Por favor, melhorem.')
      .should('have.value', 'Não gostei muito... Muito raso, sem nexo e nada legal! Por favor, melhorem.')
    
    cy
      .contains('button', 'Enviar')
      .click()
    
    cy
      .contains('Valide os campos obrigatórios!')
      .should('be.visible')

  })

  // teste 4
  it('preenche letras ao invés de números no campo telefone', () => {
    cy
      .get('#firstName')
      .type('Maanakia')
      .should('have.value', 'Maanakia')

    cy
      .get('#lastName')
      .type('Spencer Lewis')
      .should('have.value', 'Spencer Lewis')

    cy
      .get('#email')
      .type('maanLew@gmail.com')
      .should('have.value','maanLew@gmail.com')

    cy
      .get('#phone')
      .type('abcdefgh')
      .should('not.have.value')

  })

  // teste 4
  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy
      .get('#firstName')
      .type('Torisvalda')
      .should('have.value','Torisvalda')

    cy
      .get('#lastName')
      .type('Hatakaguri')
      .should('have.value','Hatakaguri')
  
    cy
      .get('#email')
      .type('toriguri@hotmail.com')
      .should('have.value','toriguri@hotmail.com')

    cy
      .get('#phone-checkbox')
      .check()
      .should('be.checked')

    cy
      .get('#open-text-area')
      .type('i liked the app, thx!')
      .should('have.value', 'i liked the app, thx!')

    cy
      .contains('button', 'Enviar')
      .click()
    
    cy
      .contains('Valide os campos obrigatórios!')
      .should('be.visible')
  
  })

  //teste 5
  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {

    cy
      .get('#firstName')
      .as('userNome')
      .type('Joe')
      .should('have.value', 'Joe')

    cy
      .get('#lastName')
      .as('userSobrenome')
      .type('Viewtful')
      .should('have.value', 'Viewtful')

    cy
      .get('#email')
      .as('userEmail')
      .type('daThruViewtfulJoe@gmail.com')
      .should('have.value', 'daThruViewtfulJoe@gmail.com')

    cy
      .get('#open-text-area')
      .as('userOpinion')
      .type("id really liked this app and courses that'll have, so glad to came up here with a good base about cypress :D")
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
    .contains('button', 'Enviar')
    .click()
  
  cy
    .contains('Valide os campos obrigatórios!')
    .should('be.visible')
  })

  // teste 7
  it('envia o formulário com sucesso usando um comando customizado', () => {

    const userData = {
      'firstName': 'Astolfo',
      'lastName': 'Rupertz',
      'email': 'rupzAst@outlook.com',
      'textArea': 'Muchas grácias por su criacione!!'
    }

    cy.fillMandatoryFieldsAndSubmit(userData)

    cy
        .get('[class="success"]')
        .should('be.visible')
  })

  // teste 7 #extra 1
  it('envia o formulário com sucesso usando um comando customizado que não recebe parâmetro', () => {
    cy.fillMandatoryFieldsAndSubmit()

    cy
        .get('[class="success"]')
        .should('be.visible')
  })

  // oitavo teste era trocar os comandos cy.get por cy.contains em alguns casos, como clique de botão mas optei por trocar tbm na validação da mensagem na tela

  it('seleciona um produto (YouTube) por seu texto', () => {

    cy
      .get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')
  })
  it('seleciona um produto (Mentoria) por seu valor (value)', () => {

    cy
      .get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria')
  })
  it('seleciona um produto (Blog) por seu índice', () => {

    cy
      .get('#product')
      .select(1)
      .should('have.value', 'blog')
  })
  it('marca o tipo de atendimento "Feedback"', () => {

    cy
      .get('input[type="radio"][value="feedback"]')
      .check('feedback')
      .should('be.checked')
      
  })
  it('marca cada tipo de atendimento', () => {

    // ele pega todos os elementos radio
    cy
      .get('input[type="radio"]')
      .each($e => {
        cy
          .wrap($e)
          .check()
          .should('be.checked')

      })
  })
  it('marca ambos checkboxes, depois desmarca o último', () => {
    // cy.get('input[type="checkbox"]')
    //   .as('checkBoxes')
    //   .each( $e => {
    //     cy.wrap($e)
    //       .check()
    //       .should('be.checked')
    //   })
    // cy.get('@checkBoxes')
    //   .last()
    //   .uncheck()


    // solução da aula
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
  })
  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json')
      .then( input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })
  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('input[type="file"]')
      .selectFile('cypress/fixtures/example.json', {'action': 'drag-drop'})
      .then( input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })
  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json').as('pathToJsonExample')

    cy.get('input[type="file"]')
      .selectFile('@pathToJsonExample') // <-- sempre passar o arroba quando citar um alias
      .should ( input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })
  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.get('a[href="privacy.html"]')
      .should('have.attr', 'target', '_blank')
  })
  it('acessa a página da política de privacidade removendo o target e então clicando no link',() => {
    cy.get('a[href="privacy.html"]')
      .invoke('removeAttr', 'target')
      .click()

    cy.contains('h1', 'CAC TAT - Política de Privacidade')
  })
  
})