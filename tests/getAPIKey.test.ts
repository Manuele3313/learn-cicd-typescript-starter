import { describe, it, expect, test } from 'vitest';
import { getAPIKey } from '../src/api/auth.ts';

describe('getAPIKey', () => {
  it('returns the API key when provided in correct format', () => {
    const headers = { authorization: 'ApiKey secret123' };
    expect(getAPIKey(headers)).toBe('secret123');
  });

  it('returns null when authorization header is missing', () => {
    const headers = {};
    expect(getAPIKey(headers)).toBeNull();
  });

  it('returns null when authorization header is undefined', () => {
    const headers = { authorization: undefined };
    expect(getAPIKey(headers)).toBeNull();
  });

  it('returns null when authorization header is empty string', () => {
    const headers = { authorization: '' };
    expect(getAPIKey(headers)).toBeNull();
  });

  it('returns null when scheme is not ApiKey', () => {
    const headers = { authorization: 'Bearer token' };
    expect(getAPIKey(headers)).toBeNull();
  });

  it('returns null when key is missing (only scheme provided)', () => {
    const headers = { authorization: 'ApiKey' };
    expect(getAPIKey(headers)).toBeNull();
  });

  it('returns empty string when there is a trailing space after scheme', () => {
    const headers = { authorization: 'ApiKey ' };
    expect(getAPIKey(headers)).toBe('');
  });

  it('is case sensitive and rejects lowercase scheme', () => {
    const headers = { authorization: 'apikey secret123' };
    expect(getAPIKey(headers)).toBeNull();
  });
});
