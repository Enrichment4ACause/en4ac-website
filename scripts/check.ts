import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';

const browser=await chromium.launch({headless:true});
const page=await browser.newPage();
const errors: string[]=[];
const baseUrl=process.env.BASE_URL ?? 'http://localhost:4321';
page.on('pageerror',error=>errors.push(error.message));

for(const width of [1440,390]){
  await page.setViewportSize({width,height:900});
  await page.goto(baseUrl,{waitUntil:'networkidle'});
  await page.evaluate(()=>document.fonts.ready);
  assert.equal(await page.locator('h1').count(),1);
  assert.equal(await page.locator('.theme-one').count(),1);
  assert.equal(await page.locator('.switcher').count(),0);
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`Site overflows at ${width}px`);
  assert(await page.locator('img').evaluateAll(images=>images.every(image=>image instanceof HTMLImageElement&&image.complete&&image.naturalWidth>0)));

  await page.locator('.project-card').first().click();
  assert(await page.locator('dialog').isVisible());
  await page.keyboard.press('Escape');
  assert.equal(await page.locator('dialog').count(),0);

  if(width===390){
    await page.getByRole('button',{name:'Toggle navigation'}).click();
    assert(await page.getByRole('navigation',{name:'Main navigation'}).isVisible());
  }
  console.log(`PASS / at ${width}px`);
}

assert.deepEqual(errors,[]);
await browser.close();
