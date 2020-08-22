import { Selector } from 'testcafe';

const btnReservar = Selector('.service-card-btn')
const btnNext = Selector('.btn-success')
const inputDate = Selector('.date-form-control')
const inputFirstName = Selector('#first_name')
const inputLastName = Selector('#last_name')
const inputEmail = Selector('#email')
const inputTelephone = Selector('#telephone')
const inputNotes = Selector('#notes')

fixture`Prueba`.page`http://127.0.0.1:8000/`;

test('Crear una reservacion', async t => {
    await t
        .click(btnReservar)
        .click(btnNext)
        .typeText(inputDate, 'agosto 4, 2020 10:00 AM')
        .pressKey('enter')
        .typeText(inputFirstName, 'Sebastian')
        .typeText(inputLastName, 'Narvaez')
        .typeText(inputEmail, 'sebastianarvaez@gmail.com')
        .typeText(inputTelephone, '3188524067')
        .typeText(inputNotes, 'corte de cabello sencillo')
        .click(btnNext)
})