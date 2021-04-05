import { BaseEndpoint } from "../base";
interface TimeTrackingSettings {
    hoursADay: number;
    daysAWeek: number;
    [key: string]: any;
}
export declare class TimetrackingEndpoint extends BaseEndpoint {
    get(): Promise<TimeTrackingSettings>;
}
export {};
