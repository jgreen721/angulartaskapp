export type UserType={
    id:number,
    username:string,
    password:string
    email:string,
}

export type TaskType={
    id:number,
    task:string,
    is_complete:boolean
    score:number,
    userId:number
}

export type LinkType={
    id:number,
    name:string,
    link:string
}