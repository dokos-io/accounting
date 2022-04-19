
context('Customer', () => {
	before(() => {
		cy.login();
	});
	it('Create Journal Entry', () => {
		cy.visit(`app/journal-entry/`);
		cy.get('.primary-action').click();
		cy.wait(500);
	});
});