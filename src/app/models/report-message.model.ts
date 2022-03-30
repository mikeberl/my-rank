export interface ReportMessage {
    id : number;
    game_id : number;
    league_id: string;
    reporter_id : string;
    message : string;
    report_type : ReportType; // todo
    date : string; //todo
}

export interface ReportMessageNoId {
    game_id : number;
    league_id: string;
    reporter_id : string;
    message : string;
    report_type : ReportType; // todo
    date : string; //todo
}

export enum ReportType {
    WRONGPOINTS,
    WRONGPLAYERS,
    DOUBLEINPUT,
    OTHERS
}
