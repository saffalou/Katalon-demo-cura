import { type Page, type Locator, expect } from "@playwright/test";

export class LoginPage {
    readonly page: Page;
    readonly username: Locator;
    readonly password: Locator;
    readonly login_button: Locator;
    readonly menu_hamburger: Locator;
    readonly login_error: string;

    constructor(page: Page) {
        this.page = page;
        this.username = page.getByLabel('Username');
        this.password = page.getByLabel('Password');
        this.login_button = page.getByRole('button', { name: 'Login' });
        this.menu_hamburger = page.locator('#menu-toggle');
        this.login_error = 'Login failed! Please ensure';
    }

    //this is where we go the the login page and pass the log in credentials
    async login(username: string, password: string) {
        await this.menu_hamburger.click();
        await this.page.getByRole('link', { name: 'Login' }).click();
        await this.username.fill(username);
        await this.password.fill(password);
        await this.login_button.click();
    }
    // this is the landing page. This where we start the test
    async gotoLoginPage() {
        await this.page.goto('https://katalon-demo-cura.herokuapp.com/');
    }


    async loginerror() {
        await expect(this.page.getByText(this.login_error)).toBeVisible();
    }
};

