import { test, expect } from '@playwright/test';

test.describe('Job Listings', () => {
  test('should fetch and display job listings', async ({ page }) => {
    const apiRequestPromise = page.waitForRequest(
        request =>
            request.url().includes('api.theirstack.com') &&
            request.method() === 'POST'
    )

    await page.goto('/');

    const request = await apiRequestPromise

    expect(request.url()).toContain('api.theirstack.com/v1/jobs/search')

    await page.waitForSelector('[data-testid="job-card"]', { timeout: 10000 })

    const jobCards = await page.locator('[data-testid="job-card"]').all()
    expect(jobCards.length).toBeGreaterThan(0)

    for (const card of jobCards) {
      const title = await card
          .locator('[data-testid="job-title"]')
          .textContent()
      expect(title).not.toBeNull()
      expect(title).not.toBe('')

      const company = await card
          .locator('[data-testid="job-company-name"]')
          .textContent()
      expect(company).not.toBeNull()
      expect(company).not.toBe('')

      const location = await card
          .locator('[data-testid="job-location"]')
          .textContent()
      expect(location).not.toBeNull()
      expect(location).not.toBe('')

      const type = await card.locator('[data-testid="job-type"]').textContent()
      expect(type).not.toBeNull()
      expect(type).not.toBe('')
    }
  });
  test('should filter job listings by type', async ({ page }) => {
    await page.goto('/')

    const filterButton = page.locator('#job-type-filter')
    await filterButton.waitFor({ state: 'visible' });
    await filterButton.click()

    const fullTimeOption = page.locator('span').filter({ hasText: 'Full-Time' })
    await fullTimeOption.click()

    await page.waitForLoadState('networkidle');

    const jobCards = page.locator('[data-testid="job-card"]');
    await expect(jobCards).not.toHaveCount(0);

    const count = await jobCards.count();
    for (let i = 0; i < count; i++) {
      const typeLocator = jobCards.nth(i).locator('[data-testid="job-type"]');
      await expect(typeLocator).toHaveText('Full-Time');
    }
  })
  test('should filter job listings by search query', async ({ page }) => {
    await page.goto('/')

    const searchInput = page.locator('input[type="text"]')
    await searchInput.fill('Engineer')

    await page.waitForLoadState('networkidle');

    const jobCards = page.locator('[data-testid="job-card"]');
    await expect(jobCards).not.toHaveCount(0);

    const count = await jobCards.count();
    for (let i = 0; i < count; i++) {
      const titleLocator = jobCards.nth(i).locator('[data-testid="job-title"]');
      await expect(titleLocator).toContainText('Engineer', {ignoreCase: true});
    }
  })
  test('should filter job listings by both type and search query', async ({ page }) => {
    await page.goto('/')

    const filterButton = page.locator('#job-type-filter')
    await filterButton.waitFor({ state: 'visible' });
    await filterButton.click()

    const fullTimeOption = page.locator('span').filter({ hasText: 'Full-Time' })
    await fullTimeOption.click()

    const searchInput = page.locator('input[type="text"]')
    await searchInput.fill('Engineer')

    await page.waitForLoadState('networkidle');

    const jobCards = page.locator('[data-testid="job-card"]');
    await expect(jobCards).not.toHaveCount(0);

    const count = await jobCards.count();
    for (let i = 0; i < count; i++) {
      const typeLocator = jobCards.nth(i).locator('[data-testid="job-type"]');
      await expect(typeLocator).toHaveText('Full-Time');

      const titleLocator = jobCards.nth(i).locator('[data-testid="job-title"]');
      await expect(titleLocator).toContainText('Engineer', {ignoreCase: true});
    }
  })
  test('should show job details when clicking "Apply Now"', async ({ page }) => {
    await page.goto('/')

    const jobCards = page.locator('[data-testid="job-card"]')
    const firstJobCard = jobCards.first()
    const applyButton = firstJobCard.locator('button:has-text("Apply Now")')
    await applyButton.click()

    await page.waitForLoadState('networkidle');

    const jobDetailsTitle = page.locator('[data-testid="job-details-title"]')
    await expect(jobDetailsTitle).toBeVisible()

    const jobDetailsCompany = page.locator('[data-testid="job-details-company"]')
    await expect(jobDetailsCompany).toBeVisible()

    const jobDetailsLocation = page.locator('[data-testid="job-details-location"]')
    await expect(jobDetailsLocation).toBeVisible()
  })
})
