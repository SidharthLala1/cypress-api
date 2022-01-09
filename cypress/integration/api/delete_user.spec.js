/// <reference types="cypress" />

describe('Testing Delete user API', () => {
	it('Test DELETE Request', () => {
		cy.request({
			method: 'DELETE',
			url: '/2',
		}).should((response) => {
			expect(response.status).eq(204);
			expect(response.body).to.be.empty;
		});
	});
});
