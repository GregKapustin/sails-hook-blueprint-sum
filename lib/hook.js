/**
 * Adds support for count blueprint and binds :model/count route for each RESTful model.
 */

var _ = require('lodash');
var actionUtil = require('./actionUtil');
var pluralize = require('pluralize');

const defaultCountBlueprint = function(req, res) {
  var Model = actionUtil.parseModel(req);

  var countQuery = Model.count(actionUtil.parseCriteria(req));

  countQuery
    .then(function(count) {
      return res.ok({count : count})
    });
    
};

const defaultSumBlueprint = function(req, res) {
  var Model = actionUtil.parseModel(req);

  var sumQuery = Model.find(actionUtil.parseCriteria(req)).sum(actionUtil.parseValues(req).sum);

  sumQuery
    .then(function(sum) {
      return res.ok({sum : sum})
    });
    
};

module.exports = function (sails) {
  return {
      initialize: function(cb) {
        var config = sails.config.blueprints;
        var countFn = _.get(sails.middleware, 'blueprints.count') || defaultCountBlueprint;
        var sumFn = _.get(sails.middleware, 'blueprints.sum') || defaultSumBlueprint;

        sails.on('router:before', function() {
          _.forEach(sails.models, function(model) {
            var controller = sails.middleware.controllers[model.identity];

            if (!controller) return;

            var baseRoute = [config.prefix, model.identity].join('/');

            if (config.pluralize && _.get(controller, '_config.pluralize', true)) {
              baseRoute = pluralize(baseRoute);
            }

            var route = baseRoute + '/count';

            sails.router.bind(route, countFn, null, {controller: model.identity});
            
            
            var route = baseRoute + '/sum';

            sails.router.bind(route, sumFn, null, {controller: model.identity});
          });
        });

        cb();
      }
  }
};
