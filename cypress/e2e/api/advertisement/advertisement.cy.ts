import { Advertisement } from "../../../models/advertisement";
import short from "short-uuid";

describe('API Create and Edit Advertisement', () => {
    let apiEndPoint = "https://admin-advertisement.herokuapp.com/api/advertisements/";
    let advertisement: Advertisement;
    let generatedUUID = short.generate();

    before(() => {
        cy.fixture('advertisement').then((advertisementFixture) => {
            advertisement = advertisementFixture;
        });
    });
    
    it('should create new advertisement', () => {
       //short function is user to generate random uuid
       let createName = advertisement.name+"APIPost"+generatedUUID;
       let createStreet = advertisement.street+"APIPost"+generatedUUID;
       let createPrice = advertisement.price;
       let createRooms = advertisement.rooms;

       console.log("Generated name: "+createName);
       console.log("Generated street: "+createStreet);

       cy.request({method: 'POST', url: apiEndPoint, body:{_id: generatedUUID, name: createName, street: createStreet, price: createPrice,rooms:createRooms}}).then(
        (response) => {
            console.log(response.body);
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('name', createName);
            expect(response.body).to.have.property('street', createStreet);
            expect(response.body).to.have.property('rooms', createRooms);
            expect(response.body).to.have.property('price', createPrice);
        }
    )
    });

    it('should edit created advertisement', () => {
        //short function is user to generate random uuid
        let editName = "CYApiPut"+generatedUUID;
        let editStreet = "CYApiPut"+generatedUUID;
        let editRooms = "12";
        let editPrice = "999";
 
        cy.request({method:'PUT', url:apiEndPoint+generatedUUID, body:{name: editName,street: editStreet,rooms: editRooms, price: editPrice}}).then(
         (response) => {
             expect(response.status).to.eq(200);   
            }
        )
        cy.request({method:'GET', url:apiEndPoint+generatedUUID}).then(
            (response) => {
                console.log(response.body);
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('_id', generatedUUID);
                expect(response.body).to.have.property('name', editName);
                expect(response.body).to.have.property('street', editStreet);
                expect(response.body).to.have.property('rooms', editRooms);
                expect(response.body).to.have.property('price', editPrice);                
               }
           )
     });
 });