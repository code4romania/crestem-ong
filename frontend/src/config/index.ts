import getConfig from 'next/config';

/**
 * Environments
 * SERVER_ENV - defined in k8s, to identify if we're running on dev or prod
 * NODE_ENV - used for compile
 */
export enum SERVER_ENVS {
  PROD = 'PROD',
  DEV = 'DEV'
}

const PRC = getConfig()?.publicRuntimeConfig;
export const SERVER_ENV: string = PRC?.SERVER_ENV;
export const DEV_MODE: boolean = process.env.NODE_ENV !== 'production';

// Urls
export const API_URL: string =
  PRC?.API_URL ?? (DEV_MODE ? 'http://localhost:8080/api/v1' : '/api/v1');
