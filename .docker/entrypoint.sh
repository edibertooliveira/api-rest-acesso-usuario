#!/bin/bash

npm install
npm run migration:up
npm run seed:up
npm run dev
