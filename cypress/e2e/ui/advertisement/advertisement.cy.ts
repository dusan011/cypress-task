import {Advertisement} from '../../../models/advertisement';
import short from "short-uuid";

describe('Create and Edit Advertisement UI Test', ()=>{
    let advertisement: Advertisement;
    let generatedUUID = short.generate();

    before(() => {
        cy.fixture('advertisement').then((advertisementFixture) => {
            advertisement = advertisementFixture;
        });
    });

    beforeEach(()=>{
        cy.visit("https://admin-advertisement.herokuapp.com/advertisements");
    })
    
    it('should create new advertisement', () => {
       //short function is user to generate random uuid
       let name = advertisement.name+generatedUUID;
       let street = advertisement.street+generatedUUID;
       console.log("Generated name: "+name);
       console.log("Generated street: "+street);

       cy.createAdvertisement(name, street, advertisement.rooms, advertisement.price);

       cy.get('advertisement-list md-table-container').should('contain',name);
       cy.get('advertisement-list md-table-container').should('contain',street);

       cy.get('advertisement-list md-table-container').contains(name).click();

       cy.get('#input_5').should('have.value', name);
       cy.get('#input_6').should('have.value', street);
       cy.get('#input_7').should('have.value', advertisement.rooms);
       cy.get('#input_8').should('have.value', advertisement.price);
    });

    it('should edit created advertisement', () => {
        let createdName = advertisement.name+generatedUUID;
        let editName = "CYEditName"+generatedUUID;
        let editStreet = "CYEditName"+generatedUUID;
        let editRooms = "18";
        let editPrice = "8";

        cy.editCreatedAdvertisement(createdName, editName, editStreet, editRooms, editPrice);

        cy.get('advertisement-list md-table-container').should('contain',editName);
        cy.get('advertisement-list md-table-container').should('contain',editStreet);

        cy.get('advertisement-list md-table-container').contains(editName).click();

        cy.get('#input_5').should('have.value', editName);
        cy.get('#input_6').should('have.value', editStreet);
        cy.get('#input_7').should('have.value', editRooms);
        cy.get('#input_8').should('have.value', editPrice);
     });
})