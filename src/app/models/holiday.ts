export class Holiday {
    id: number;
    name: string;
    begin_date: Date;
    end_date: Date;
    company_id: number;
    kind: string;
}

export class HolidayPost {
    holiday: Holiday;
}

export class HolidaySchedule {
    id: number;
    title: string;
    start: string;
    end: string;
    type: string;
}
