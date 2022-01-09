/// <reference types="cypress" />

describe('List user api testing', () => {
	it('fetches list of all users  - GET', () => {
		cy.request('/?page=2/').as('usersRequest');
		cy.get('@usersRequest').then((users) => {
			expect(users.status).to.eq(200);
			expect(users.body).to.not.be.null;
			console.log(users.body);
			expect(users.body).to.contain.property('data');
			expect(users.body.data[0].email).to.eq('michael.lawson@reqres.in');
			expect(users.body.data[0].first_name).to.eq('Michael');
			expect(users.body.data[0].last_name).to.eq('Lawson');
			expect(users.body).to.contain.property('page');
			expect(users.body.page).to.eq(2);
			expect(users.body).to.contain.property('per_page');
			expect(users.body).to.contain.property('support');
			expect(users.body).to.contain.property('total');
			expect(users.body).to.contain.property('total_pages');
			//assert.isArray(users.body).to.be.a('array');
		});
	});

	it('fetches a single users  - GET', () => {
		cy.request('/2').as('usersRequest');
		cy.get('@usersRequest').then((users) => {
			expect(users.status).to.eq(200);
			expect(users.body).to.not.be.null;
			console.log(users.body);
			expect(users.body).to.contain.property('data');
			expect(users.body).to.contain.property('support');
			//assert.isArray(users.body).to.be.a('array');
		});
	});

	it('List all the resources - GET', () => {
		cy.request('https://reqres.in/api/unknown').as('usersRequest');
		cy.get('@usersRequest').then((users) => {
			expect(users.status).to.eq(200);
			expect(users.body).not.to.be.empty;
			console.log(users.body);
			expect(users.body).to.contain.property('data');
			expect(users.body.data[0].name).to.eq('cerulean');
			expect(users.body.data[1].name).to.eq('fuchsia rose');
			expect(users.body).to.contain.property('page');
			expect(users.body).to.contain.property('per_page');
			expect(users.body).to.contain.property('support');
			expect(users.body).to.contain.property('total');
			expect(users.body).to.contain.property('total_pages');
		});
	});

	it('Test GET Request Single user not found', () => {
		cy.request({
			method: 'GET',
			url: 'https://reqres.in/api/users/23',
			failOnStatusCode: false,
		}).should((response) => {
			expect(response.status).eq(404);
			expect(response.body).to.be.empty;
		});
	});
});
