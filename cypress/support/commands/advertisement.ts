/**
  * Function for creating advertisement
  * Name, street, rooms, price will be generated using CY+random UUID
  *
  * @param {string} name - Advertisement name
  * @param {string} street - Advertisement street
  * @param {string} rooms - Advertisement rooms
  * @param {string} price - Advertisement price
  * @example
  *   
  *    cy.createAdvertisement('CYname123', 'CYstreet123', '10', '15');
  */
 export const createAdvertisement = (
   name: string, street: string, rooms: string, price: string
 ): void => {
       cy.get(".al-add__button").click();
       cy.get('#input_0').type(name); 
       cy.get('#input_1').type(street); 
       cy.get('#input_2').type(rooms); 
       cy.get('#input_3').type(price); 
       cy.get('.md-label > .ng-scope').click();
 };

 declare global {
  namespace Cypress {
    interface Chainable {
      createAdvertisement: typeof createAdvertisement;
    }
  }
}