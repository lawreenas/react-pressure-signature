# React Pressure-sensitive Signature pad

A React component, extending [signature-pad](https://github.com/szimek/signature_pad) with [Pressure](https://github.com/stuyam/pressure) data when signing.

## Demo

[Demo](https://lawreenas.github.io/react-pressure-signature/). Works both on desktop and mobile devices, records both rouch and pen pressure when available.
You can checkout demo application [source code](https://github.com/lawreenas/react-pressure-signature/blob/example/src/App.js)

## Install

To install the latest release

`npm install --save react-pressure-signature`

or

`yarn add react-pressure-signature`

## Usage

```javascript
var React = require('react');
import SignaturePad from 'react-pressure-signature';

React.render(
  <SignaturePad />,
  document.body
)
```
You can checkout demo application [source code](https://github.com/lawreenas/react-pressure-signature/blob/example/src/App.js)

## APIs

### Callbacks

- onChange - callback to retrieve each signature point as it is being recorded.

## Todos

- Add API to retieve signature all of the data (coordinates with pressure)
- Add API to retrieve signature as an image