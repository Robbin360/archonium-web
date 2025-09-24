from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto("http://localhost:3000")

        # Wait for the hero section to be loaded
        hero_selector = "h1:has-text('Forging the Future.')"
        page.wait_for_selector(hero_selector)

        page.screenshot(path="jules-scratch/verification/verification.png")
        browser.close()

run()
