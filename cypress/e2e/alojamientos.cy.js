describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3001')

    //const inicarSesion = cy.get('.header > div:nth-child(2) button:nth-child(1)')
    //inicarSesion.click()
    const buscarAlojamientosDeDosPersonas = cy.get('.search-button')
    buscarAlojamientosDeDosPersonas.click()

    const verOferta = cy.get('.contenedor-ofertas > div:nth-child(2) .hotel-content .booking-info .offer-button')
    verOferta.click()

    const fechar = cy.get('.a-rellenar div .react-datepicker__input-container')
    fechar.click()

    const fechaActual = new Date(new Date().getFullYear(), new Date().getMonth())
    var fechaObjetivo = new Date(new Date().getFullYear(), new Date().getMonth())
    fechaObjetivo.setMonth(fechaActual.getMonth() + 2)
    const nombreDeLosMeses = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    cy.get('.react-datepicker-popper button').click().click()
    cy.get('.react-datepicker-popper').should('contain', nombreDeLosMeses[fechaObjetivo.getMonth()] + " " + fechaObjetivo.getFullYear())
    cy.get('.a-rellenar div .react-datepicker__day--011').click()
    cy.get('.a-rellenar div .react-datepicker__day--025').click()

    const reservar = cy.get('.datos-reserva button')
    reservar.click()

    cy.get('input[name="email"]').type("Grupo9@hotmail.com")
    cy.get('input[name="password"]').type("1234")

    cy.get('.actions > button:nth-child(2)').click()
    cy.get('.root div div > div:nth-child(2)').should('contain', 'Credenciales invalidas')
  })
})