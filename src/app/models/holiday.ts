export class Holiday {
    id: number;
    name: string;
    begin_date: Date;
    end_date: Date;
    company_id: number;
    is_repeat: boolean = false;
}

export class HolidayPost {
    holiday: Holiday;
}

export class HolidaySchedule {
    id: number;
    title: string;
    start: string;
    end: string;
    is_repeat: boolean = false;
}
