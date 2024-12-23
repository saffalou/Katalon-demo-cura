import { type Page, type Locator, expect } from "@playwright/test";
import { getToday, getTomorrow, getYesterday } from "../utilities/dateUtils";

const APPOINTMENT_SUMMARY_URL = 'https://katalon-demo-cura.herokuapp.com/appointment.php#summary';

export class AppointmentPage{
    readonly page: Page;
    //data entered for appointment
    readonly facility_drop_down: Locator;
    readonly facility: Locator; 
    readonly hospital_readmit: Locator;
    readonly healthcare_medicare: Locator;
    readonly healthcare_medicaid: Locator;
    readonly healthcare_none: Locator;
    readonly visit_date_entered: Locator;
    readonly comment: Locator;
    readonly book_appointment: Locator;
    //to check the details of made appointment
    //labels on appointment confirmation
    readonly booked_facility: Locator;
    readonly apply_for_hosp_read: Locator;
    readonly healthcare_program: Locator;
    readonly visit_date_check: Locator;
    readonly comment_check: Locator;  
    //appointment confirmation data
    readonly ac_facility: Locator;
    readonly ac_hospital_readmit: Locator;
    readonly ac_healthcare_program: Locator;
    readonly ac_visit_date_entered: Locator;
    readonly ac_comment: Locator;
    readonly go_to_homepage: Locator;



    //locators
    constructor(page: Page){
        const facilitySelect = page.getByLabel('Facility');

        this.page = page;
        this.facility_drop_down = page.locator('#combo_facility')   
        this.facility = page.getByLabel('Facility'); 
        this.hospital_readmit = page.getByLabel('Apply for hospital readmission');
        this.healthcare_medicare = page.getByText('Medicare');
        this.healthcare_medicaid = page.getByText('Medicaid');
        this.healthcare_none = page.getByText('None');
        this.visit_date_entered = page.getByRole('textbox', { name: 'Visit Date' });
        this.comment = page.locator('#txt_comment');
        this.book_appointment = page.locator('#btn-book-appointment');
        //appointment confirmation labels
        this.booked_facility = page.getByText('Facility');
        this.apply_for_hosp_read = page.getByText('Apply for hospital readmission');
        this.healthcare_program = page.getByText('Healthcare Program');
        this.visit_date_check = page.getByText('Visit Date');
        // xpath seems the most stable for this one and removes clash of duplicates
        this.comment_check = page.locator('xpath=//*[@id="summary"]/div/div/div[6]/div[1]/label');
        
        //appointment confirmation data
        this.ac_facility = page.locator('#facility');
        this.ac_hospital_readmit = page.locator('#hospital_readmission');
        this.ac_healthcare_program = page.locator('#program');
        this.ac_visit_date_entered = page.locator('#visit_date');
        // xpath seems the most stable for this one and removes clash of duplicates
        this.ac_comment = page.locator('xpath= //*[@id="comment"]');
        this.go_to_homepage = page.locator('.btn btn-default');
    }

    async preBookingPageCheck(){
        await expect(this.facility_drop_down).toBeVisible();
        await expect(this.hospital_readmit).toBeVisible();
        await expect(this.hospital_readmit).not.toBeChecked();
        await expect(this.healthcare_medicare).toBeVisible();
        await expect(this.healthcare_medicare).toBeChecked();
        await expect(this.healthcare_medicaid).not.toBeChecked();
        await expect(this.visit_date_entered).toBeVisible();
        await expect(this.healthcare_none).not.toBeChecked();        
        await expect(this.comment).toBeVisible();
        await expect(this.comment).toHaveValue('');
        await expect(this.book_appointment).toBeVisible();
        await expect(this.book_appointment).toBeEnabled();
    }

        //create appointment using medicare with facility at Hong Kong      
    async make_an_appointment_1(){    
       await this.facility_drop_down.click();
        await this.facility.selectOption('Hongkong CURA Healthcare Center');
        await this.hospital_readmit.check();
        await this.healthcare_medicare.click();
        await this.visit_date_entered.click()
        await this.page.keyboard.type(getToday());
        await this.page.keyboard.press('Tab');
        await this.comment.fill('test comment 1. This should be a medicare appointment');
        await this.page.keyboard.press('Tab');
        await this.book_appointment.click();
    }
    //this is where we check the appointment to confirm entered equals retained
    //verify with assertions
    async verify_appointment_1(){
        //verify page URL
        await expect (this.page).toHaveURL(APPOINTMENT_SUMMARY_URL);
        //verify labels - only doing this on first test as risk of it changing on susequent tests seems pretty low. 
        // In this, and each of thesubsequent tests we will continue to confirm the appointment values
        await expect (this.booked_facility).toHaveText('Facility');
        await expect (this.apply_for_hosp_read).toHaveText('Apply for hospital readmission');
        await expect (this.healthcare_program).toHaveText('Healthcare Program');
        await expect (this.visit_date_check).toHaveText('Visit Date');
        await expect (this.comment_check).toHaveText('Comment');
        //verify appointment data on confirmation page
        await expect (this.ac_facility).toHaveText('Hongkong CURA Healthcare Center');
        await expect (this.ac_hospital_readmit).toHaveText('Yes');
        await expect (this.ac_healthcare_program).toHaveText('Medicare');
        await expect (this.ac_visit_date_entered).toHaveText(getToday());
        await expect (this.ac_comment).toHaveText('test comment 1. This should be a medicare appointment');
 
    }
     //create appointment using medicare with facility at Tokyo      
     async make_an_appointment_2(){
        await this.facility_drop_down.click();
        await this.facility.selectOption('Tokyo CURA Healthcare Center');
        await this.hospital_readmit.check();
        await this.healthcare_medicaid.click();
        await this.visit_date_entered.click()
        //.fill() did not work well on this field. .keyboard.type() seems to work well
        await this.page.keyboard.type(getTomorrow());
        await this.page.keyboard.press('Tab');
        //.fill() did not work well on this field. .keyboard.type() seems to work well
        await this.comment.fill('test comment 2. This should be a medicaid appointment');
        await this.page.keyboard.press('Tab');
        await this.book_appointment.click();
    }
    //this is where we check the appointment to confirm entered equals retained
    //verify with assertions
    async verify_appointment_2(){
        //verify page URL
        await expect (this.page).toHaveURL(APPOINTMENT_SUMMARY_URL);
        
        //verify appointment data on confirmation page
        await expect (this.ac_facility).toHaveText('Tokyo CURA Healthcare Center');
        await expect (this.ac_hospital_readmit).toHaveText('Yes');
        await expect (this.ac_healthcare_program).toHaveText('Medicaid');
        await expect (this.ac_visit_date_entered).toHaveText(getTomorrow());
        await expect (this.ac_comment).toHaveText('test comment 2. This should be a medicaid appointment');
    
    }

    //create appointment using "none" with facility at Seoul      
    async make_an_appointment_3(){
        await this.facility_drop_down.click();
        await this.facility.selectOption('Seoul CURA Healthcare Center');
        await this.hospital_readmit.check();
        await this.healthcare_none.click();
        await this.visit_date_entered.click()
        await this.page.keyboard.type(getToday());
        await this.page.keyboard.press('Tab');
        await this.comment.fill('test comment 3. This appointment has no associated healthcare system');
        await this.page.keyboard.press('Tab');
        await this.book_appointment.click();
    }
    //this is where we check the appointment to confirm entered equals retained
    //verify with assertions
    async verify_appointment_3(){
        //verify page URL
        await expect (this.page).toHaveURL(APPOINTMENT_SUMMARY_URL);
       
        //verify appointment data on confirmation page
        await expect (this.ac_facility).toHaveText('Seoul CURA Healthcare Center');
        await expect (this.ac_hospital_readmit).toHaveText('Yes');
        await expect (this.ac_healthcare_program).toHaveText('None');
        await expect (this.ac_visit_date_entered).toHaveText(getToday());
        await expect (this.ac_comment).toHaveText('test comment 3. This appointment has no associated healthcare system');     

       
    }

     //on this website, this test will pass even though it is booking for yesterday.
    // would expect in a production systen that booking for yesterday would not be allowed and would raise an error.
     async make_an_appointment_4(){
        await this.facility_drop_down.click();
        await this.facility.selectOption('Seoul CURA Healthcare Center');
        await this.hospital_readmit.check();
        await this.healthcare_none.click();
        await this.visit_date_entered.click()
        await this.page.keyboard.type(getYesterday());
        await this.page.keyboard.press('Tab');
        await this.comment.fill('test comment 3. This appointment has no associated healthcare system');
        await this.page.keyboard.press('Tab');
        await this.book_appointment.click();
    }
    //this is where we check the appointment to confirm entered equals retained
    //verify with assertions
    async verify_appointment_4(){
        //verify page URL
        await expect (this.page).toHaveURL(APPOINTMENT_SUMMARY_URL);
       
        //verify appointment data on confirmation page
        await expect (this.ac_facility).toHaveText('Seoul CURA Healthcare Center');
        await expect (this.ac_hospital_readmit).toHaveText('Yes');
        await expect (this.ac_healthcare_program).toHaveText('None');
        await expect (this.ac_visit_date_entered).toHaveText(getYesterday());
        await expect (this.ac_comment).toHaveText('test comment 3. This appointment has no associated healthcare system');       

       
    }


    };