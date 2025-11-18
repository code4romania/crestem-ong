'use strict';

/**
 * mentor-program service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::mentor-program.mentor-program');
