describe('Automated E2E tests', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('.feedback-overview').should('be.visible');
  })

  it('A-01 - See all feedbacks', () => {
    cy.get('.feedback-overview__entry').should('have.length', 10);
  })

  it('A-02 - Filter feedbacks', () => {
    cy.get('.feedback-filter').should('be.visible');
    // test product filter
    cy.get('.feedback-filter__field--product').should('be.visible');
    cy.get('#product').select('HAFTPFLICHT');
    cy.get('.feedback-filter__field--submit').click();
    cy.get('.feedback-overview__entry').should('have.length', 2);
    // test rating filter
    cy.get('#product').select('ALL');
    cy.get('.feedback-filter__field--rating').should('be.visible');
    cy.get('#rating').select('5');
    cy.get('.feedback-filter__field--submit').click();
    cy.get('.feedback-overview__entry').should('have.length', 3);
    // test date from filter
    cy.get('#rating').select('ALL');
    cy.get('.feedback-filter__field--date-from').should('be.visible');
    cy.get('#dateFrom').type('2025-02-19');
    cy.get('.feedback-filter__field--submit').click();
    cy.get('.feedback-overview__entry').should('have.length', 2);
    // test date to filter
    cy.get('#dateFrom').clear();
    cy.get('.feedback-filter__field--date-to').should('be.visible');
    cy.get('#dateTo').type('2025-02-19');
    cy.get('.feedback-filter__field--submit').click();
    cy.get('.feedback-overview__entry').should('have.length', 8);
    // test filter in combination
    cy.get('#product').select('HAFTPFLICHT');
    cy.get('#rating').select('3');
    cy.get('#dateFrom').type('2025-02-10');
    cy.get('.feedback-filter__field--submit').click();
    cy.get('.feedback-overview__entry').should('have.length', 1);
  })

  it('A-03 - Sort feedbacks', () => {
    cy.get('.feedback-filter').should('be.visible');
    // check order
    cy.get('.feedback-overview__entry').first()
      .find('.feedback-overview__created')
      .should('have.text', ' 10. Februar 2025 ');
    cy.get('.feedback-overview__entry').last()
      .find('.feedback-overview__created')
      .should('have.text', ' 20. Februar 2025 ');
    // set DESC order
    cy.get('.feedback-filter__field--date-sort').should('be.visible');
    cy.get('#dateSort').select('DESC');
    cy.get('.feedback-filter__field--submit').click();
    // check order
    cy.get('.feedback-overview__entry').first()
      .find('.feedback-overview__created')
      .should('have.text', ' 20. Februar 2025 ');
    cy.get('.feedback-overview__entry').last()
      .find('.feedback-overview__created')
      .should('have.text', ' 10. Februar 2025 ');
    // set ASC order
    cy.get('.feedback-filter__field--date-sort').should('be.visible');
    cy.get('#dateSort').select('ASC');
    cy.get('.feedback-filter__field--submit').click();
    // check order
    cy.get('.feedback-overview__entry').first()
      .find('.feedback-overview__created')
      .should('have.text', ' 10. Februar 2025 ');
    cy.get('.feedback-overview__entry').last()
      .find('.feedback-overview__created')
      .should('have.text', ' 20. Februar 2025 ');
  })

  it('A-04 - Detail view', () => {
    cy.get('.feedback-overview__entry').first().click();
    cy.get('.feedback-details__container').should('be.visible');
    cy.url().should('contain', '/details/FB-2025-0001');
    // check information
    cy.get('.feedback-details__left').contains('10. Februar 2025');
    cy.get('.feedback-details__left').contains('Haftpflicht');
    cy.get('.feedback-details__left').find('.feedback-details__rating--stars').should('have.length', 5);
    cy.get('.feedback-details__left').contains('Privatkunden');
    cy.get('.feedback-details__left').contains('Agentur');
    cy.get('.feedback-details__left').contains('Beratung');
    cy.get('.feedback-details__left').contains('Service Qualitaet');
    // check comment
    cy.get('.feedback-details__right').contains('Sehr freundliche Beratung, alles verständlich erklärt.');
    // go back to overview
    cy.get('.feedback-details__back').should('be.visible');
    cy.get('.feedback-details__back').click();
    cy.url().should('not.contain', '/details/FB-2025-0001');
  })
  it('A-05 - Mobile filter', () => {
    // set mobile viewport
    cy.viewport('iphone-6')
    // check that filters are not visible yet
    cy.get('.feedback-filter').should('not.be.visible');
    cy.get('.feedback-filter__toggle').should('be.visible');
    // click filters open
    cy.get('.feedback-filter__toggle').click();
    // check that filters are visible
    cy.get('.feedback-filter').should('be.visible');
    cy.get('.feedback-filter__field--product').should('be.visible');
    // select a filter
    cy.get('#product').select('HAFTPFLICHT');
    cy.get('.feedback-filter__field--submit').click();
    // filter shouldn't be visible yet
    cy.get('.feedback-filter').should('not.be.visible');
  })

  it('A-06 - Display loading screen', () => {
    cy.intercept('GET', '/feedbacks', {
      fixture: 'feedbacks.json',
      delay: 2000
    }).as('getFeedbacks');
    cy.visit('/');
    cy.get('.skeleton').should('be.visible');
    cy.wait('@getFeedbacks');
    cy.get('.skeleton').should('not.exist');
  });

  it('A-07 - Happy Flow', () => {
    // set filter
    cy.get('.feedback-filter').should('be.visible');
    cy.get('.feedback-filter__field--product').should('be.visible');
    cy.get('#product').select('HAFTPFLICHT');
    cy.get('.feedback-filter__field--submit').click();
    // click first feedback
    cy.get('.feedback-overview__entry').first().click();
    cy.url().should('contain', '/details/');
    // go back to overview
    cy.get('.feedback-details__back').should('be.visible');
    cy.get('.feedback-details__back').click();
    cy.url().should('not.contain', '/details/');
  });

})
