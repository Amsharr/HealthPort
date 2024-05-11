export interface Doctor{
    id: number;
    firstName: string;
    lastName: string;
    specialityid: number;
    dob: Date | null;
    nicNo: string | null;
    mobileNo: string | null;
    email: string; 
    address: string; 
    username: string; 
    password: string;
    fee: number | null;
}
