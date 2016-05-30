'use strict';

import { assert }       from 'chai';
import fs               from 'fs';

import walker           from '../../src/index.js';

const walkerPath =   '../../dist/index';

suite('AST Walker:', () =>
{
   suite('require walker:', () =>
   {
      let requireWalker;

      setup(() => { requireWalker = require(walkerPath); });
      teardown(() => { requireWalker = undefined; });

      test('require does not throw', () =>
      {
         assert.doesNotThrow(() => { require(walkerPath); });
      });

      test('walker object is exported', () =>
      {
         assert.isObject(requireWalker);
      });

      test('walker throws when traverse is called with empty parameters', () =>
      {
         assert.throws(() => { requireWalker.traverse(); });
      });
   });

   suite('walker:', () =>
   {
      suite('successfully parses ast tree (fixture):', () =>
      {
         test('result has proper node counts', () =>
         {
            const nodeCounts = {};
            const nodeResults = JSON.parse(fs.readFileSync('./test/fixture/espree-estree-results.json', 'utf8'));

            walker.traverse(JSON.parse(fs.readFileSync('./test/fixture/espree-estree.json', 'utf8')),
            {
               enterNode: (node) =>
               {
                  nodeCounts[node.type] = typeof nodeCounts[node.type] === 'undefined' ? 1 : nodeCounts[node.type] + 1;
               }
            });

            Object.keys(nodeResults).forEach((key) =>
            {
               assert.strictEqual(nodeCounts[key], nodeResults[key]);
            });
         });
      });
   });
});
