const Daikin = require('../lib/index.js');

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
    let unitInfo = await client.getUnitInfo();
    console.log(unitInfo);
}

async function powerOn() {
    let response = await client.powerOn();
    console.log(response);
}

async function powerOff() {
    let response = await client.powerOff();
    console.log(response);
}

async function setPower(pow) {
    let response = await client.setPower(pow);
    console.log(response);
}

async function setSmartMode() {
    let response = await client.setSmartMode();
    console.log(response);
}

async function setAutofanMode() {
    let response = await client.setAutofanMode();
    console.log(response);
}

async function setEconoMode() {
    let response = await client.setEconoMode();
    console.log(response);
}

async function setPollenMode() {
    let response = await client.setPollenMode();
    console.log(response);
}

async function setMoistMode() {
    let response = await client.setMoistMode();
    console.log(response);
}

async function setCirculatorMode() {
    let response = await client.setCirculatorMode();
    console.log(response);
}

async function setAirvol(level) {
    let response = await client.setAirvol(level);
    console.log(response);
}

async function setHumd(level) {
    let response = await client.setHumd(level);
    console.log(response);
}

// getUnitInfo();
// powerOn();
// powerOff();
// setPower(POW_ON);
// setSmartMode();
// setAutofanMode();
// setEconoMode();
// setPollenMode();
// setMoistMode();
// setCirculatorMode();
// setAirvol(AIRVOL_STANDARD);
// setHumd(HUMD_STANDARD);