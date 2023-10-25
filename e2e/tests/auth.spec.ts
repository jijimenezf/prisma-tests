import { test, expect } from "./fixtures/auth.fixture"

test.describe('auth', () => {
    test('shoud redirect unauthorized user to the login page', async ({
        page
    }) => {
        await page.goto('http://localhost:5173/')
        await expect(page).toHaveURL('http://localhost:5173/login')
    })

    test('should warn you if your login is incorrect', async ({
        page,
        loginPage
    }) => {
        await loginPage.populateForm('incorrect', 'password')
        await page.click('#login')
        await page.waitForLoadState('networkidle')
        await expect(page.getByText('Account not found.')).toBeVisible()
    })

    test('shoud warn you if your form is empty', async ({
        page,
        loginPage
    }) => {
        await loginPage.page.click('#login')
        await page.waitForLoadState('networkidle')
        await expect(page.getByText('Please enter a username and password')).toBeVisible()
    })

    test('should redirect to the homepage when a new account is created', async ({
        user_credentials,
        loginPage,
        storage,
        page
    }) => {
        await loginPage.populateForm(
            user_credentials.username,
            user_credentials.password
        )

        await page.click('#signup')
        await page.waitForLoadState('networkidle')

        const localStorage = await storage.localStorage
        expect(localStorage).toHaveProperty('quoots-user')
        await expect(page).toHaveURL('http://localhost:5173')
    })

    test('should redirect to the home page after signing in', async ({
        account,
        loginPage,
        storage,
        page
    }) => {
        await loginPage.populateForm(
            account.username,
            account.password
        )

        await page.click('#login')
        await page.waitForLoadState('networkidle')
        
        const localStorage = await storage.localStorage
        expect(localStorage).toHaveProperty('quoots-user')
        await expect(page).toHaveURL('http://localhost:5173')
    })
})
