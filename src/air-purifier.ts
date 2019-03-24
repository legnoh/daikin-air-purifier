import axios, {AxiosInstance} from 'axios';
import * as DAP from './interfaces'

const RES_STYLE_NONE = 0
const RES_STYLE_URLENCODED = 1
const RES_STYLE_COLON = 2
const POW_ON = 1;
const POW_OFF = 0;
const MODE_SMART = 1;
const MODE_AUTOFAN = 0;
const MODE_ECONO = 2;
const MODE_POLLEN = 3;
const MODE_MOIST = 4;
const MODE_CITCULATOR = 5;
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

export class AirPurifier {

    private readonly login_id: string;
    private readonly password: string;
    private readonly instance: AxiosInstance;

    constructor(login_id: string, password: string) {
        this.password = password;
        this.login_id = login_id;
        this.instance = axios.create({
            url: '/',
            baseURL: 'https://daikinsmartdb.jp/',
            params: {
                id: this.login_id,
                spw: this.password,
                port: '30050',
            },
            timeout: 5000,
        });
    }

    // 指定したユニット（空気清浄機1台）の情報を取得する
    public async getUnitInfo(): Promise<DAP.UnitInfo> {
        return await this._get<DAP.UnitInfo>('/cleaner/get_unit_info', RES_STYLE_URLENCODED)
    }

    public async powerOn() {
        return await this.setControlInfo(POW_ON);
    }

    public async powerOff() {
        return await this.setControlInfo(POW_OFF);
    }

    public async setPower(pow: number) {
        return await this.setControlInfo(pow);
    }

    public async setSmartMode() {
        return await this.setControlInfo(POW_ON, MODE_SMART, AIRVOL_AUTOFAN, HUMD_AUTO);
    }

    public async setAutofanMode() {
        const unitInfo = await this.getUnitInfo();
        return await this.setControlInfo(POW_ON, MODE_AUTOFAN, AIRVOL_AUTOFAN, unitInfo.ctrl_info.humd);
    }

    public async setEconoMode() {
        const unitInfo = await this.getUnitInfo();
        return await this.setControlInfo(POW_ON, MODE_ECONO, AIRVOL_AUTOFAN, unitInfo.ctrl_info.humd);
    }

    public async setPollenMode() {
        const unitInfo = await this.getUnitInfo();
        return await this.setControlInfo(POW_ON, MODE_POLLEN, AIRVOL_AUTOFAN, unitInfo.ctrl_info.humd);
    }

    public async setMoistMode() {
        return await this.setControlInfo(POW_ON, MODE_MOIST, AIRVOL_AUTOFAN, HUMD_AUTO);
    }

    public async setCirculatorMode() {
        const unitInfo = await this.getUnitInfo();
        return await this.setControlInfo(POW_ON, MODE_CITCULATOR, AIRVOL_AUTOFAN, unitInfo.ctrl_info.humd);
    }

    public async setAirvol(airvol: number) {
        const unitInfo = await this.getUnitInfo();
        return await this.setControlInfo(unitInfo.ctrl_info.pow, unitInfo.ctrl_info.mode, airvol, unitInfo.ctrl_info.humd);
    }

    public async setHumd(humd: number) {
        const unitInfo = await this.getUnitInfo();
        return await this.setControlInfo(unitInfo.ctrl_info.pow, unitInfo.ctrl_info.mode, unitInfo.ctrl_info.airvol, humd);
    }

    public async setControlInfo (pow: number, mode?: number, airvol?: number, humd?: number): Promise<DAP.ControlInfo>{
        let params = { pow: pow };

        if (mode != undefined) {
            params = Object.assign(params, {mode: mode})
        }
        if (airvol != undefined) {
            params = Object.assign(params, {airvol: airvol})
        }
        if (humd != undefined) {
            params = Object.assign(params, {humd: humd})
        }
        return await this._get('/cleaner/set_control_info', RES_STYLE_NONE, params)
    }

    private async _get<T>(url: string, resStyle: number, params?: object): Promise<T> {
        let results: any;
        try {
            if(params) {
                this.instance.defaults.params = Object.assign(this.instance.defaults.params, params)
            }
            const response = await this.instance.get(url);
            results = {};
            const responsePairs = response.data.toString().split(',');
            let responseKeyValues = new Map();
            responsePairs.forEach(function(responsePair): void {
                let pair = responsePair.split('=');
                responseKeyValues[pair[0]] = pair[1];
            });
            switch(resStyle) {
                case RES_STYLE_URLENCODED :
                    Object.keys(responseKeyValues).forEach(function (key) {
                        let decodedKeyValues = new Map();
                        const decodedPairs = decodeURIComponent(responseKeyValues[key]).split(',');
                        if ( decodedPairs.length >= 2 ) {
                            decodedPairs.forEach(function(decodedPair): void {
                                let pair = decodedPair.split('=');
                                decodedKeyValues[pair[0]] = pair[1];
                            });
                            results[key] = decodedKeyValues;
                        } else {
                            results[key] = responseKeyValues[key];
                        }
                    });
                    break;
                case RES_STYLE_NONE :
                    results = responseKeyValues;
                    break;
            }
            return results;
        } catch (error) {
            if (error.response) {
                throw new Error(`Response code is out of 2xx: ${error.response.status}`)
            }
            throw error
        }
    }
}