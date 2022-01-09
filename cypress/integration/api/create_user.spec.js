/// <reference types="cypress" />

let fakeUser = { name: 'morpheus', job: 'leader' };

describe('When I send POST request to create user', () => {
	it('Then it should create a new user', () => {
		cy.request({
			method: 'POST',
			url: '/user',
			body: fakeUser,
		}).should((response) => {
			expect(response.status).eq(201);
			expect(response.body).to.contain.property('name');
			expect(response.body).to.contain.property('job');
			expect(response.body).to.contain.property('id');
			expect(response.body.name).to.eq('morpheus');
			expect(response.body.job).to.eq('leader');
		});
	});

	it('This PUT request should update a user', () => {
		cy.request({
			method: 'PUT',
			url: '/user',
			body: {
				name: 'morpheus',
				job: 'zion resident',
			},
		}).should((response) => {
			expect(response.status).eq(200);
			expect(response.body).to.contain.property('name');
			expect(response.body).to.contain.property('job');
			expect(response.body.name).to.eq('morpheus');
			expect(response.body.job).to.eq('zion resident');
		});
	});

	it('This PATCH request should update a user', () => {
		cy.request({
			method: 'PATCH',
			url: '/user',
			body: {
				name: 'new',
				job: 'zion resident',
			},
		}).should((response) => {
			expect(response.status).eq(200);
			expect(response.body).to.contain.property('name');
			expect(response.body).to.contain.property('job');
			expect(response.body).to.contain.property('updatedAt');
			expect(response.body.name).to.eq('new');
			expect(response.body.job).to.eq('zion resident');
		});
	});
});
