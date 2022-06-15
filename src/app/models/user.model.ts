
export interface User {
    id: number;
    name: string;
    username: string;
    password? : string; 
    img: string;
    email?: string;
    leagues : string[];
    access_token? : string;
}
