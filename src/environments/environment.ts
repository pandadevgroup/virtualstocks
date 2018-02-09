// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
	production: false,
	firebase: {
		apiKey: "AIzaSyBNdlM3Ep-hM_RN0HDNDaNB6HhkGVLzejI",
		authDomain: "virtualstocks-io.firebaseapp.com",
		databaseURL: "https://virtualstocks-io.firebaseio.com",
		projectId: "virtualstocks-io",
		storageBucket: "virtualstocks-io.appspot.com",
		messagingSenderId: "641060668413"
	}
};
