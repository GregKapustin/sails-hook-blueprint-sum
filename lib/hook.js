/**
 * Adds support for count blueprint and binds :model/count route for each RESTful model.
 */

var _ = require('lodash');
var actionUtil = require('./actionUtil');
var pluralize = require('pluralize');

const defaultSumBlueprint = function(req, res) {
  var Model = actionUtil.parseModel(req);

  var sumQuery = Model.find(actionUtil.parseCriteria(req)).sum(actionUtil.parseValues(req).sum);

  sumQuery
    .then(function(sum) {
      return res.ok({sum : sum});
    });
    
};

const defaultMaxBlueprint = function(req, res) {
  var Model = actionUtil.parseModel(req);

  var maxQuery = Model.find(actionUtil.parseCriteria(req)).max(actionUtil.parseValues(req).max);

  maxQuery
    .then(function(max) {
      return res.ok({max : max});
    });
    
};

module.exports = function (sails) {
  return {
      initialize: function(cb) {
        var config = sails.config.blueprints;
        var sumFn = _.get(sails.middleware, 'blueprints.sum') || defaultSumBlueprint;
        var maxFn = _.get(sails.middleware, 'blueprints.max') || defaultMaxBlueprint;

        sails.on('router:before', function() {
          _.forEach(sails.models, function(model) {
            var controller = sails.middleware.controllers[model.identity];

            if (!controller) return;

            var baseRoute = [config.prefix, model.identity].join('/');

            if (config.pluralize && _.get(controller, '_config.pluralize', true)) {
              baseRoute = pluralize(baseRoute);
            }

            var route = baseRoute + '/sum';
            sails.router.bind(route, sumFn, null, {controller: model.identity});
            
            var route = baseRoute + '/max';
            sails.router.bind(route, maxFn, null, {controller: model.identity});
            
            
          });
        });

        cb();
      }
  };
};

