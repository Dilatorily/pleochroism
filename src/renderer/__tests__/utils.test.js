import * as Utils from '../utils';

describe('utils', () => {
  describe('isDevelopment', () => {
    let NODE_ENV;
    beforeAll(() => {
      NODE_ENV = process.env.NODE_ENV;
    });

    afterEach(() => {
      process.env.NODE_ENV = NODE_ENV;
    });

    it('should correctly detect the development environment', () => {
      process.env.NODE_ENV = 'development';
      expect(Utils.isDevelopment()).toBe(true);
    });

    it('should detect when it is not in the development environment', () => {
      process.env.NODE_ENV = 'production';
      expect(Utils.isDevelopment()).toBe(false);
    });

    it('should be case-sensitive', () => {
      process.env.NODE_ENV = 'DEVELOPMENT';
      expect(Utils.isDevelopment()).toBe(false);
    });
  });

  describe('isProduction', () => {
    let NODE_ENV;
    beforeAll(() => {
      NODE_ENV = process.env.NODE_ENV;
    });

    afterEach(() => {
      process.env.NODE_ENV = NODE_ENV;
    });

    it('should correctly detect the production environment', () => {
      process.env.NODE_ENV = 'production';
      expect(Utils.isProduction()).toBe(true);
    });

    it('should detect when it is not in the production environment', () => {
      process.env.NODE_ENV = 'development';
      expect(Utils.isProduction()).toBe(false);
    });

    it('should be case-sensitive', () => {
      process.env.NODE_ENV = 'PRODUCTION';
      expect(Utils.isProduction()).toBe(false);
    });
  });
});
