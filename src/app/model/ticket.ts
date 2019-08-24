export class Ticket {
    id:string;
    Amount: number = 0;
    IdFestival: string = "";
    Money: number = 0;
    NameFestival: string = '';
}
export class Hotel {
    id:string;
    Amount:number=0 ;
    Endday:string='' ;
    IdFestival:string='' ;
    NameFestival:string='' ;
    Startday: string='';
    Typeroom: string='Single room';
}

export class Tour {
    id:string;
    Amount: number = 0;
    IdFestival: string = "";
    Money: number = 0;
    NameFestival: string = '';
    
}
export class Total {
   Total:number=0;
}

