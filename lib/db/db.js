var console = require('prefabLOG')('com:prefabsoft:prefabRESOURCE:db');
console.debug('in com:prefabsoft:prefabRESOURCE:db');

var db;
var _ = require('underscore');
var dbConfig = require('./dbConfig.json');
var cradle = require('cradle');
var prefab = require('prefab')();

module.exports = exports = db = function db_module(input) {

	var cfg = _.extend({
		output : {}
	}, input);

	var db = new (cradle.Connection)().database(dbConfig.database);

	db.exists(function(err, data) {
		if (err) {
			console.error('Error while checking if database exists', err);
		} else if (data) {
			console.log('debug','database \'%s\' exists',dbConfig.database);
			// db.destroy(prefab.fn);
		} else {
			console.log('debug','database \'%s\' doesn\'t exist...creating it',dbConfig.database);
			db.create(prefab.fn);
		}
	});
	
	function get(id, fn) {
		console.log('debug', 'get(%s)', id);

		db.get(id, function(err, data) {
			console.log('debug', 'db.get(%s)', data);
			if (err) {
				// Handle error
				console.error(err);
			} else {
				// Handle success
				console.info('getById returning doc', data);
			}
			fn && fn(err, data);
		});
	}
	
	cfg.output.get = get;
	
	


	var extra = {
		get : ,
		put : function(id, data, fn) {
			console.log('debug', 'put(%s) with data: %j', id, data);

			db.save(id, data, function(err, data) {
				if (err) {
					// Handle error
					console.error(err);
				} else {
					// Handle success
					console.info('data saved ', data);
				}
				fn && fn(err, data);
			});
		},
		remove : function(id, fn) {
			extra.get(id, function(err, doc) {
				db.remove(doc._id, doc._rev, function(err, data) {
					if (err) {
						// Handle error
						console.error(err);
					} else {
						// Handle success
						console.log('data', 'result: %j',data);
					}
					fn && fn(err, data);
				});
			});
		},
		save : function(id, data, fn){
			db.save(id, data, fn);
		},
		view : function(id, fn){
			db.view(id, fn);
		}
	};
	
	
	return cfg.output;
};
