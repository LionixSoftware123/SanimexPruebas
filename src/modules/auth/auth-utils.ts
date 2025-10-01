import { AuthStep } from './auth-types';

let query: URLSearchParams;
if (typeof window !== 'undefined') {
  query = new URLSearchParams(window.location.search);
}

export const getStep = (): AuthStep => {
  return query && query.has('action')
    ? (query.get('action') as AuthStep)
    : AuthStep.authLogin;
};
