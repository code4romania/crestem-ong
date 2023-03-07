'use strict';

/**
 * evaluation service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::evaluation.evaluation');
