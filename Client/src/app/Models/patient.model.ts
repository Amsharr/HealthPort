export interface Patient {
    id: number;
    firstName: string;
    lastName: string;
    gender: string | null;
    nationality: string | null;
    dob: Date | null;
    nicNo: number | null;
    mobileNo: number | null;
    email: string;
    address: string;
    username: string;
    password: string;
    fullName:string | null;
    height: string | null;
    weigth: string | null;
    bloodtype: string | null;
}