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
       cy.get('[ng-disabled="$ctrl.disableSave"] > .ng-scope').click();

       cy.get('.md-toast-content').should('contain', 'Saved successfully');
 };

 /**
  * Function for editing exiting advertisement
  * Edit Name, street will be generated using CYEdit+random UUID
  *
  * @param {string} existingName - Advertisement existing name
  * @param {string} name - Advertisement edit name
  * @param {string} street - Advertisement edit street
  * @param {string} rooms - Advertisement edit rooms
  * @param {string} price - Advertisement edit price
  * @example
  *   
  *    cy.editCreatedAdvertisement('CYCreateName123','CYEditName123', 'CYEditStreet123', '10', '15');
  */
 export const editCreatedAdvertisement = (
  existingName: string, name: string, street: string, rooms: string, price: string
): void => {
      cy.get('advertisement-list md-table-container').contains(existingName).click();
      cy.get('#input_0').clear().type(name);
      cy.get('#input_1').clear().type(street);
      cy.get('#input_2').clear().type(rooms);
      cy.get('#input_3').clear().type(price);
      cy.get('[ng-disabled="$ctrl.disableSave"] > .ng-scope').click();
      
      cy.get('.md-toast-content').should('contain', 'Saved successfully');
};

 declare global {
  namespace Cypress {
    interface Chainable {
      createAdvertisement: typeof createAdvertisement;
      editCreatedAdvertisement: typeof editCreatedAdvertisement;
    }
  }
}