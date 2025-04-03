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
})
