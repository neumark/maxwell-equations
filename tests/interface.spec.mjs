import { test, expect } from '@playwright/test';

test('all laws, signs, equation forms, and keyboard navigation work', async ({ page }) => {
  const errors=[]; page.on('pageerror',e=>errors.push(e.message));
  await page.goto('/');
  await expect(page.getByRole('heading',{level:1})).toContainText('Four equations');
  await page.getByLabel('Charge q',{exact:true}).focus();
  await page.keyboard.press('Home');
  await expect(page.locator('.control-note').first()).toContainText('-2 q₀');
  await expect(page.getByRole('img',{name:/Electric field around a negative/})).toBeVisible();
  await page.getByLabel('Surface radius',{exact:true}).focus(); await page.keyboard.press('End');
  await expect(page.locator('.control-note').first()).toContainText('-2 q₀');
  await page.getByRole('button',{name:'Show integral form'}).click();
  await expect(page.locator('.equation')).toHaveText('∯ E · dA = Qinside / ε₀');
  await page.getByRole('tab',{name:/Magnetic loops/}).click();
  await page.getByRole('checkbox',{name:/Show a closed surface/}).uncheck();
  await expect(page.locator('.lab-visual svg ellipse')).toHaveCount(0);
  await page.getByRole('tab',{name:/Magnetic loops/}).focus(); await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('tab',{name:/Changing magnetism/})).toHaveAttribute('aria-selected','true');
  const rate=page.getByLabel('Rate of change of magnetic flux',{exact:true}); await rate.focus(); await page.keyboard.press('Home');
  await expect(page.locator('.control-note').first()).toContainText('counterclockwise');
  for(let i=0;i<4;i++)await page.keyboard.press('ArrowRight');
  await expect(page.locator('.control-note').first()).toContainText('No induced circulation');
  await page.getByRole('tab',{name:/Changing electricity/}).click();
  await page.getByRole('button',{name:'Changing E in a gap'}).click();
  await expect(page.getByLabel('Rate of change of electric flux',{exact:true})).toBeVisible();
  await page.getByRole('button',{name:'No, because flux is steady'}).click();
  await expect(page.locator('[aria-live=polite]')).toContainText('Exactly');
  expect(errors).toEqual([]);
});

test('wave pause, field toggles, and constant-speed frequency control',async({page})=>{
  await page.goto('/');
  await page.getByRole('button',{name:'Ⅱ Pause'}).click();
  const wave=page.locator('.wave-board svg'); const before=await wave.innerHTML();
  await page.waitForTimeout(120); expect(await wave.innerHTML()).toBe(before);
  await page.getByLabel('Frequency',{exact:true}).focus(); await page.keyboard.press('Home');
  await expect(page.locator('.wave-board .control-note')).toContainText('λ = 2.00 λ₀');
  await page.getByLabel('Electric E',{exact:true}).uncheck();
  await expect(wave.locator('text.field-label')).toHaveText(['B']);
  await page.getByLabel('Magnetic B',{exact:true}).uncheck();
  await expect(wave.locator('text.field-label')).toHaveCount(0);
  await page.getByText('See how the wave follows from the equations').click();
  await expect(page.getByText('∇²E = μ₀ε₀ ∂²E / ∂t²',{exact:true})).toBeVisible();
});

test('responsive layout, reduced motion, and screenshots',async({page})=>{
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.setViewportSize({width:1440,height:1000}); await page.goto('/'); await page.evaluate(()=>document.fonts.ready);
  await expect(page.getByRole('button',{name:'▷ Play'})).toBeVisible();
  await page.screenshot({path:'/private/tmp/maxwell-desktop.png',fullPage:true});
  for(const width of [390,320]){
    await page.setViewportSize({width,height:844});
    for(const name of [/Electric charges/,/Magnetic loops/,/Changing magnetism/,/Changing electricity/]){
      await page.getByRole('tab',{name}).click();
      expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
    }
    if(width===390){await page.getByRole('tab',{name:/Electric charges/}).click();await page.screenshot({path:'/private/tmp/maxwell-mobile.png',fullPage:true});}
  }
});
