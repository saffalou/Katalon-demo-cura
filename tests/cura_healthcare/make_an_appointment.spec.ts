import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/cura_login';
import {AppointmentPage} from '../../pages/cura_make_an_appointment';

//we need to log in before making an appointment. We can re-use our login script
test.beforeEach(async ({ page }) => {
  const Login = new LoginPage(page);
  await Login.gotoLoginPage();
  await Login.login('John Doe', 'ThisIsNotAPassword');;
});

test('check appointment booking fields for starting values and presence in form', async ({ page }) => {
  const Appointment = new AppointmentPage(page);
  
  await Appointment.preBookingPageCheck();
})

test('appointment creation using medicare and Hong Kong facility', async ({ page }) => {

  const Appointment = new AppointmentPage(page);
//create new appointment
  await Appointment.make_an_appointment_1();

  //check that the entered appointment details are those saved  and shown in the summary
  await Appointment.verify_appointment_1();

});

  test('appointment creation using medicade and Tokyo facility', async ({ page }) => {
        
      const Appointment = new AppointmentPage(page);
    //create new appointment
      await Appointment.make_an_appointment_2();
    
      //check that the entered appointment details are those saved  and shown in the summary
      await Appointment.verify_appointment_2();

  });

      test('appointment creation using "none" and Seoul facility', async ({ page }) => {
                
          const Appointment = new AppointmentPage(page);
        //create new appointment
          await Appointment.make_an_appointment_3();
        
          //check that the entered appointment details are those saved  and shown in the summary
          await Appointment.verify_appointment_3();

      });
  


