'use strict';

describe('Schemator schema methods', function () {

  describe('Schemator#availableSchemata()', function () {
    it('not implemented');
  });

  describe('Schemator#defineSchema(name, schema)', function () {
    it('not implemented');
  });

  describe('Schemator#removeSchema(name)', function () {
    it('not implemented');
  });

  describe('Schemator#getSchema(name)', function () {
    it('should return "undefined" if the schema is not registered', function () {
      assert.isUndefined(schemator.getSchema('PersonSchema'));
    });
    it('should return the correct schema', function () {
      var PersonSchema = schemator.defineSchema('PersonSchema', {
        name: 'string'
      });

      assert.isTrue(schemator.getSchema('PersonSchema') === PersonSchema);
    });
  });

  describe('Schemator#setDefaults(name, attrs)', function () {
    it('should throw an error if the schema is not registered', function () {
      assert.throws(function () {
        schemator.setDefaults('PersonSchema', {
          first: ''
        });
      }, Error, 'schema is not registered!');
    });
    it('should set the defaults for the schema', function () {
      schemator.defineSchema('PersonSchema', {
        name: 'string'
      });

      schemator.setDefaults('PersonSchema', {
        first: ''
      });

      assert.deepEqual(schemator.getDefaults('PersonSchema'), {
        first: ''
      });
    });
  });

  describe('Schemator#getDefaults(name)', function () {
    it('should throw an error if the schema is not registered', function () {
      assert.throws(function () {
        schemator.getDefaults('PersonSchema');
      }, Error, 'schema is not registered!');
    });
    it('should get the defaults for the schema', function () {
      schemator.defineSchema('PersonSchema', {
        name: 'string'
      });

      schemator.setDefaults('PersonSchema', {
        first: ''
      });

      assert.deepEqual(schemator.getDefaults('PersonSchema'), {
        first: ''
      });
    });
  });

  describe('Schemator#addDefaultsToTarget(name, attrs[, overwrite])', function () {
    it('should throw an error if the schema is not registered', function () {
      assert.throws(function () {
        schemator.addDefaultsToTarget('PersonSchema', {});
      }, Error, 'schema is not registered!');
    });
    it('should add defaults to the target', function () {
      schemator.defineSchema('PersonSchema', {
        name: 'string'
      });

      schemator.setDefaults('PersonSchema', {
        first: '',
        last: '',
        plan: 'free'
      });

      var person = {
        first: 'John',
        plan: 'premium'
      };

      schemator.addDefaultsToTarget('PersonSchema', person);

      assert.deepEqual(person, {
        first: 'John',
        last: '',
        plan: 'premium'
      });

      schemator.addDefaultsToTarget('PersonSchema', person, true);

      assert.deepEqual(person, {
        first: '',
        last: '',
        plan: 'free'
      });
    });
  });

  describe('Schemator#stripNonSchemaAttrs(name, attrs[, overwrite])', function () {
    it('should throw an error if the schema is not registered', function () {
      assert.throws(function () {
        schemator.stripNonSchemaAttrs('PersonSchema', {});
      }, Error, 'schema is not registered!');
    });
    it('should strip non-schema attributes from the target', function () {
      schemator.defineSchema('PersonSchema', {
        name: 'string'
      });

      var person = {
        name: 'John',
        random: 'value'
      };

      schemator.stripNonSchemaAttrs('PersonSchema', person);

      assert.deepEqual(person, {
        name: 'John'
      });
    });
  });
});
