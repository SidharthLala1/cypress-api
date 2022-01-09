/// <reference types="cypress" />

const cypressLogToOutput = require('cypress-log-to-output');

// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */

module.exports = (on, config) => {
	// Todo: maybe raise a PR instead of overwriting `on("before:browser:launch", ...)` twice.
	cypressLogToOutput.install(on, (type, event) => {
		if (event.level === 'error' || event.type === 'error') {
			return true;
		}
		return false;
	});

	// `on` is used to hook into various events Cypress emits
	// `config` is the resolved Cypress config
	on('before:browser:launch', (browser = {}, launchOptions) => {
		/*
      Uncomment below to get console log printed in cypress output
    */

		launchOptions.args = cypressLogToOutput.browserLaunchHandler(
			browser,
			launchOptions.args
		);
		if (browser.name === 'chrome') {
			launchOptions.args.push('--disable-dev-shm-usage');
			return launchOptions;
		}

		return launchOptions;
	});
};
