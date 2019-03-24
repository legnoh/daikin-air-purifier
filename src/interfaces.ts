/** UnitInfo */

export interface UnitInfo {
    ret: string
    ctrl_info: CtrlInfo
    sensor_info: SensorInfo
    unit_status: UnitStatus
    dev_setting: DevSetting
}

export interface CtrlInfo {
    pow: number
    mode: number
    airvol: number
    humd: number
}

export interface SensorInfo {
    htemp: number
    hhum: number
    pm25: number
    dust: number
    odor: number
}

export interface UnitStatus {
    filter: number
    strmr_cln: number
    water_supply: number
    unit_err: number
}

export interface DevSetting {
    led_dsp: number
    d_sns: number
    c_lock: number
    streamer: number
    act_ion: number
    buzzer: number
    turbo: string
    eco_moni: number
}

/** ControlInfo**/
export interface ControlInfo {
    ret: string
}
