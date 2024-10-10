import { type Page, type Locator, expect } from "@playwright/test";

export class LandingPage {
    readonly page: Page;
    readonly cura_text: Locator;
    readonly we_care_text: Locator;
    readonly make_appointment: Locator;
    cura_low_frame: Locator;
    cura_address: Locator;
    menu_hamburger: Locator;
    sidebar: Locator;
    menu_home: Locator;
    menu_login: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cura_text = page.locator('h1');
        this.we_care_text = page.locator('h3');
        this.make_appointment = page.locator('#btn-make-appointment');
        this.cura_low_frame = page.locator('h4');
        this.cura_address = page.getByRole('contentinfo');
        this.menu_home = page.getByRole('link', { name: 'Home' });
        this.menu_login = page.getByRole('link', { name: 'Login' });
        this.sidebar = page.locator('#sidebar-wrapper');
        this.menu_hamburger = page.locator('#menu-toggle');
    }
    async gotoLandingPage() {
        await this.page.goto('https://katalon-demo-cura.herokuapp.com/');
    };

    async verifyLandingPage() {
        await expect(this.cura_text).toHaveText('CURA Healthcare Service');
        await expect(this.we_care_text).toHaveText('We Care About Your Health');
        await expect(this.make_appointment).toBeVisible();
        await expect(this.make_appointment).toHaveText('Make Appointment');
        await expect(this.cura_low_frame).toHaveText('CURA Healthcare Service');
        await expect(this.cura_address).toContainText('Atlanta 550 Pharr Road NE Suite 525Atlanta, GA 30305');
        //hamburger side bar button and contents
        await expect(this.sidebar).toContainText('CURA Healthcare');
        await expect(this.menu_hamburger).toBeVisible();
        await expect(this.menu_home).toHaveText('Home');
        await expect(this.menu_login).toHaveText('Login');

    }
};
