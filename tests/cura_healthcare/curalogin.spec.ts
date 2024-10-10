import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/cura_login';

test('login with valid credentials', async ({ page }) => {

    const Login = new LoginPage(page);
    await Login.gotoLoginPage();
    await Login.login('John Doe', 'ThisIsNotAPassword');
});


test('login with invalid credentials - valid user wrong password', async ({ page }) => {

    const Loginfail = new LoginPage(page);
    await Loginfail.gotoLoginPage();
    await Loginfail.login('John Doe', 'ThisIsNot');

    await Loginfail.loginerror();

});

test('login with invalid credentials - invalid user with valid password', async ({ page }) => {

    const Loginfail = new LoginPage(page);
    await Loginfail.gotoLoginPage();
    await Loginfail.login('John', 'ThisIsNotAPassword');

    await Loginfail.loginerror();
});

test('login with invalid credentials - no user name or password', async ({ page }) => {

    const Loginfail = new LoginPage(page);
    await Loginfail.gotoLoginPage();
    await Loginfail.login('', '');

    await Loginfail.loginerror();
});