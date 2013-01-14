var console = require('prefabLOG')({
	filtername : 'com:prefabsoft:prefabRESOURCE:app',
	clear : true
});
// console.log(console);

var user = require('../prefabRESOURCE')('user');

console.log(user);
