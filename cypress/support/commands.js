/// <reference types="Cypress" />

Cypress.on('uncaught:exception', (err, runnable) => {
	// returning false here prevents Cypress from
	// failing the test
	//expect(err.message).to.include('uncaught errors from the application');
	return false;
});
