# sails-hook-blueprint-sum

Directly based on [Kristian Ackar](https://github.com/kristian-ackar)'s package [Sails-hook-blueprint-count](https://github.com/kristian-ackar/sails-hook-blueprint-count).

Adds blueprint api method to sum values of attribute(s) on records in database.
This is useful for example get a total amount of transactions.
Adds also max method.

The sum function comes from [here](https://github.com/balderdashy/waterline/issues/61).

## Installation

In Sails.js v0.11+ installed hooks are run automatically. Therefore, simply install the hook via `npm`:

    npm install sails-hook-blueprint-sum

## Usage

    GET /:model/sum?where={:CRITERIA}&sum=:attribute1&sum=:attribute2
    GET /:model/max?where={:CRITERIA}&max=:attribute1&max=:attribute2

"where" parameter is optional. If it's used it's used in the same way like you use it in default blueprint api find method
[Sails.js blueprint api find method documentation](http://sailsjs.org/documentation/reference/blueprint-api/find-where).

"sum" attribute is mandatory and errors will be raised if attributes are not compliant to the sum function. *Handling of these errors is not implented yet, thus it's a 0.0.1 version.*
