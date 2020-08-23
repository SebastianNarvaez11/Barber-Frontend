import { Selector } from 'testcafe';

class Buscador {

    public searchInput;
    public resultsSection;
    public searchButton;
    public emailField;
    public passwordField;
    public userSidebar;
    public create;
    //formulario creacion usuario
    public fieldcreateusername;
    public emailcreate;
    public username;
    public userlastname;
    public userpasswordcreate;
    public role;
    public createform;
   


    constructor(){
        this.searchInput = Selector('.nav-search-input');
        this.searchButton =  Selector('a').withAttribute('href', '/login');
        this.emailField =  Selector('#formBasicEmail');
        this.passwordField =  Selector('#formBasicPassword');
        this.resultsSection = Selector('.vip-nav-bounds');
        this.userSidebar = Selector('a').withAttribute('href', '/admin/users');
        this.create = Selector('.btn.btn-success');
        this.fieldcreateusername = Selector('#formGridUsername');
        this.emailcreate = Selector('#formGridEmail');
        this.username = Selector('#formGridName');
        this.userlastname = Selector('#formGridLatsName');
        this.role = Selector('#formGridState');
        this.userpasswordcreate = Selector('#formGridPassword1');
        this.resultsSection = Selector('.Toastify__toast.Toastify__toast--success');






    }
}

export default new Buscador()

