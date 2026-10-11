export interface User {
    id: number
    username: string
}

export interface AuthData {
    username: string
    password: string
}


export interface UserData {
    user: User
    csrf_token: string
}