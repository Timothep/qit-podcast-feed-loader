
describe('Queue', function () {

  beforeEach(function () {
    cy.server()

    cy.route({
      method: 'GET',
      url: 'https://podcasts.search.windows.net/indexes/podcasts/docs?api-version=2017-11-11&$count=true&search=six',
      response: 'fixture:six_search_results.json'
    })

    cy.fixture('six_search_results.json').as('six_search_results')

    cy.visit('/search/six')
  })

  describe('Add & Remove', function () {

    it('can add & remove 1 from the queue', function () {
      // Add to queue & go to queue page
      cy.get('[data-playlist=add]:first').click()
      cy.get('button').contains('<').click()

      // Verify 1 result in queue list
      cy.get('li').should('have.length', 1)

      // Click remove queue button
      cy.get('[data-playlist=remove]:first').click()

      // Verify its removed
      cy.get('li').should('not.exist')
    })

    it('can add & remove many from the queue', function () {
      // Click all add to queue buttons & go to queue page
      //cy.get('li > button').click({ multiple: true })
      cy.get('[data-playlist=add]').click({ multiple: true })
      cy.get('button').contains('<').click()

      cy.get('li').should('have.length', this.six_search_results['@odata.count'])

      // Click all the remove buttons
      cy.get('[data-playlist=remove]').click({ multiple: true })

      // Verify its removed
      cy.get('li').should('not.exist')
    })

  })

  describe('Drag To Sort', function () {
    
    // function movePlaylistItem (number, x, y) {
    //   cy.get(`.piece-${number}`)
    //     .trigger('mousedown', { which: 1 })
    //     .trigger('mousemove', { clientX: x, clientY: y })
    //     .trigger('mouseup', {force: true})
    // }

    it.skip('can drag playlist item down', function () {

    })

    it.skip('can drag playlist item up', function () {

    })
  })

})
