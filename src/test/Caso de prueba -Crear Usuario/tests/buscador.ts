import buscador from '../page-object/buscador';
import { Selector } from 'testcafe';

const dataSet = require('../data-driven/elementos.json');

const roleSelect = Selector('#formGridState');
const roleOption = roleSelect.find('option');



fixture`Ejemplo E2E`
    .page`http://127.0.0.1:8000/`;

dataSet.forEach(data => {
    test('Registrar usuario cliente', async t => {
    await t
        //.typeText(buscador.searchInput, data.searchElement)
        //.pressKey('enter')
        .click(buscador.searchButton)
      //  .click(buscador.emailField)
        .typeText(buscador.emailField, data.searchElement)
        .typeText(buscador.passwordField, data.pass)
        .pressKey('enter')
        .click(buscador.userSidebar)
        .click(buscador.create)
        .typeText(buscador.fieldcreateusername, data.userName)
        .typeText(buscador.emailcreate , data.correoPrueba)
        .typeText(buscador.username , data.Nombre)
        .typeText(buscador.userlastname , data.Apellido)
        //.click(buscador.role)
        .click(roleSelect)
        .click(roleOption.withText('Cliente'))
        .typeText(buscador.userpasswordcreate, data.passUser)
        .pressKey('enter')


        
        
        .expect(buscador.resultsSection.exists).ok('',{timeout: 5000});
        
    });
});
