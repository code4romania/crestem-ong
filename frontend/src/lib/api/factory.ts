import { AxiosInstance } from 'axios';
import { Configuration } from '@generated-api/configuration';
import { BaseAPI } from '@generated-api/base';
import client from './httpClient';

export default function initApi<T extends BaseAPI>(ApiClassCtr: {
  new (configuration?: Configuration, basePath?: string, axios?: AxiosInstance): T;
}): T {
  return new ApiClassCtr(undefined, '', client);
}
