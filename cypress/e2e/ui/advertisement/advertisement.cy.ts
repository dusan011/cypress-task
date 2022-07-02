import {Advertisement} from '../../../models/advertisement';
import short from "short-uuid";

describe('Create and Edit Advertisement UI Test', ()=>{
    let advertisement: Advertisement;
    let generatedUUID = short.generate();

    before(() => {
        cy.fixture('advertisement').then((advertisementFixture) => {
            advertisement = advertisementFixture;
        });
        cy.visit("https://admin-advertisement.herokuapp.com/advertisements");
    });
    
    it('should create new advertisement', () => {
       //short function is user to generate random uuid
       let name = advertisement.name+generatedUUID;
       let street = advertisement.street+generatedUUID;
       cy.createAdvertisement(name, street, advertisement.rooms, advertisement.price);
       
       cy.get('[ng-disabled="$ctrl.disableSave"] > .ng-scope').click();
       cy.get('.md-toast-content').should('contain', 'Saved successfully');

       cy.get('advertisement-list md-table-container').should('contain',name);
       cy.get('advertisement-list md-table-container').should('contain',street);

       cy.get('advertisement-list md-table-container').contains(name).click();

       cy.get('#input_5').should('have.value', name);
       cy.get('#input_6').should('have.value', street);
       cy.get('#input_7').should('have.value', advertisement.rooms);
       cy.get('#input_8').should('have.value', advertisement.price);
    });
})