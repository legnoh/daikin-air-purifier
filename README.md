# Daikin Air Purifier

client library for daikin air purifier([MCK70V](https://www.daikinaircon.com/ca/hg/spec.html))

```bash
yarn add legnoh/daikin-air-purifier
# or
npm install legnoh/daikin-air-purifier
```

## Basic Usage

```js
const Daikin = require('daikin-air-purifier')

const AIRVOL_AUTOFAN = 0;
const AIRVOL_QUIET = 1;
const AIRVOL_LOW = 2;
const AIRVOL_STANDARD = 3;
const AIRVOL_TURBO = 5;
const HUMD_OFF = 0;
const HUMD_LOW = 1;
const HUMD_STANDARD = 2;
const HUMD_HIGH = 3;
const HUMD_AUTO = 4;

const client = new Daikin.AirPurifier(process.env.DAIKIN_ID,process.env.DAIKIN_PASSWORD);

async function getUnitInfo() {
    const unitInfo = await client.getUnitInfo();
    console.log(unitInfo);
}

async function powerOn() {
    const response = await client.powerOn();
    console.log(response);
}

async function powerOff() {
    const response = await client.powerOff();
    console.log(response);
}

async function setSmartMode() {
    const response = await client.setSmartMode();
    console.log(response);
}

async function setAutofanMode() {
    const response = await client.setAutofanMode();
    console.log(response);
}

async function setEconoMode() {
    const response = await client.setEconoMode();
    console.log(response);
}

async function setPollenMode() {
    const response = await client.setPollenMode();
    console.log(response);
}

async function setMoistMode() {
    const response = await client.setMoistMode();
    console.log(response);
}

async function setCirculatorMode() {
    const response = await client.setCirculatorMode();
    console.log(response);
}

async function setAirvol(level) {
    let response = await client.setAirvol(level);
    console.log(response);
}

async function setHumd(level) {
    const response = await client.setHumd(level);
    console.log(response);
}
```
