import { Selector } from 'testcafe';

const btnCrear = Selector('.btn-success')
const user = Selector('#formBasicEmail')
const pass = Selector('#formBasicPassword')
const btnLogin = Selector('.btn-primary')
const btnServices = Selector('.fa-barcode')
const inputName = Selector('#formGridUsername')
const inputDescription = Selector('#formGridEmail')
const inputPrice = Selector('#formGridLatsName')
const inputDuration = Selector('#formGridPhone')
const select = Selector('select').filter('[name="status"]');
const btnCrearServicio = Selector('input[type=submit]')
const alert = Selector('.Toastify__toast-body').exists;

fixture`Prueba`.page`http://127.0.0.1:8000/admin/services`;

test('Crear servicio', async t => {
    await t
        .typeText(user, 'admin')
        .typeText(pass, 'tatannvrz')
        .click(btnLogin)
        .click(btnServices)
        .click(btnCrear)
        .typeText(inputName, 'Corte para caballero')
        .typeText(inputDescription, 'Corte sencillo')
        .typeText(inputPrice, '20000')
        .typeText(inputDuration, '32')
        .click(select)
        .click(Selector('option').filter('[value="ACTIVO"]'))
        .setFilesToUpload('#formGridName', [
            './1.jpg',
            './2.jpg',
        ])
        .click(btnCrearServicio)
        .expect(alert).ok()

})