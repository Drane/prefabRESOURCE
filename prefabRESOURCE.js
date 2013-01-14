var console = require('prefabLOG')('com:prefabsoft:prefabRESOURCE');
console.log('debug','in com:prefabsoft:prefabRESOURCE');

var prefabRESOURCE;
var _ = require('underscore');
var db = require('./lib/db/db')();

module.exports = exports = prefabRESOURCE = function prefabRESOURCE_module(input) {

	if(_.isString(input)) input = {name : input };

	var cfg = _.extend({
		storage : db,
		output : {
			data : {
				Type : input.name
			}
		}
	}, input);

	console.log('debug','cfg: %j', cfg)
	
	cfg.output.add = function(data){
		cfg.output.data = _.extend(cfg.output.data, data);
	}

	return cfg.output;
}; 