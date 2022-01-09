/// <reference types="cypress" />

let RegisterUser = { email: 'eve.holt@reqres.in', password: 'pistol' };
describe('Testing POST user API to register user', () => {
	it('Test POST Request to register a new user', () => {
		cy.request({
			method: 'POST',
			url: 'https://reqres.in/api/register',
			body: RegisterUser,
		}).should((response) => {
			expect(response.status).eq(200);
			expect(response.body).to.contain.property('id');
			expect(response.body).to.contain.property('token');
			expect(response.body.id).to.eq(4);
		});
	});

	it('Test POST Request to register unsucessful', () => {
		cy.request({
			method: 'POST',
			url: 'https://reqres.in/api/register',
			body: { email: 'sydney@fife' },
			failOnStatusCode: false,
		}).should((response) => {
			expect(response.status).eq(400);
			expect(response.body).to.contain.property('error');
			expect(response.body.error).to.eq('Missing password');
		});
	});

	let LoginUser = { email: 'eve.holt@reqres.in', password: 'cityslicka' };
	it('Test POST Request for successful login', () => {
		cy.request({
			method: 'POST',
			url: 'https://reqres.in/api/login',
			body: LoginUser,
		}).should((response) => {
			expect(response.status).eq(200);
			expect(response.body).to.contain.property('token');
		});
	});
	it('Test POST Request for unsuccessful login', () => {
		cy.request({
			method: 'POST',
			url: 'https://reqres.in/api/login',
			body: { email: 'peter@klaven' },
			failOnStatusCode: false,
		}).should((response) => {
			expect(response.status).eq(400);
			expect(response.body).to.contain.property('error');
			expect(response.body.error).to.eq('Missing password');
		});
	});
});
