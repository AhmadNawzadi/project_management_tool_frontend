import { User } from "./user" 

export interface Project {
    name : string
    description : string
    startDate : Date
    user? : User 
}
