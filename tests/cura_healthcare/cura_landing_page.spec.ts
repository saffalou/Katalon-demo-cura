import { test, expect } from '@playwright/test';
import { LandingPage } from '../../pages/landing_page';

test('katalon-demo landing page elements exist as required', async ({ page }) => {
  const Login = new LandingPage(page);
  await Login.gotoLandingPage();
  await Login.verifyLandingPage();
});

