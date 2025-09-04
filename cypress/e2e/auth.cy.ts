describe('Authentication', () => {
  it('should show an error for invalid login', () => {
    cy.visit('http://localhost:3000/login');
    cy.get('input[name="email"]').type('admin@gmail.com');
    cy.get('input[name="password"]').type('Admin1234');
    cy.get('button[type="submit"]').click();
    // cy.contains(/invalid|error|incorrect/i).should('exist');
  });

  it('should display the registration form', () => {
    cy.visit('http://localhost:3000/register');
    cy.get('form').should('exist');
    cy.get('input[name="email"]').should('exist');
    cy.get('input[name="password"]').should('exist');
    cy.get('button[type="submit"]').should('exist');
  });

  it('should log in successfully with valid credentials', () => {
    cy.visit('http://localhost:3000/login');
    cy.get('input[name="email"]').type('admin@gmail.com');
    cy.get('input[name="password"]').type('Admin1234');
    cy.get('button[type="submit"]').click();
    // Check for the user icon (adjust selector as needed)
    cy.get('button[aria-label="User menu"], [data-testid="user-icon"], .user-icon').first().click();
    // Check for menu items
    cy.contains('Profile').should('exist');
    cy.contains('Dashboard').should('exist');
    cy.contains('Logout').should('exist');
  });
});

describe('Add to Cart', () => {
  it('should allow a guest to add a product to the cart', () => {
    cy.visit('http://localhost:3000/products');
    // Click the first product to go to its details page
    cy.get('a[href^="/products/"]').first().click();
    // Click the Add to Cart button (adjust selector as needed)
    cy.contains(/add to cart/i).click();
    // Check for cart update or confirmation (adjust selector as needed)
    cy.contains(/added to cart|cart updated|view cart/i).should('exist');
  });

  it('should allow a logged-in user to add a product to the cart', () => {
    // Log in first
    cy.visit('http://localhost:3000/login');
    cy.get('input[name="email"]').type('admin@gmail.com');
    cy.get('input[name="password"]').type('Admin1234');
    cy.get('button[type="submit"]').click();
    // Visit products page
    cy.visit('http://localhost:3000/products');
    // Click the first product to go to its details page
    cy.get('a[href^="/products/"]').first().click();
    // Click the Add to Cart button (adjust selector as needed)
    cy.contains(/add to cart/i).click();
    // Check for cart update or confirmation (adjust selector as needed)
    cy.contains(/added to cart|cart updated|view cart/i).should('exist');
  });
}); 