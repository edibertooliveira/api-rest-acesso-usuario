#!/bin/bash

ts-node-dev -r tsconfig-paths/register ./node_modules/typeorm/cli.js schema:drop
ts-node-dev -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:run && ts-node ./script/seedUp.ts
