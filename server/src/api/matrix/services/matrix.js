'use strict';

/**
 * matrix service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::matrix.matrix');
