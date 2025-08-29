// src/app/models/user.model.ts
export interface User {
   id?: string
    uid?: string
    name?: string
    phone?: number
    email?: string
    password?: string
    userType?: number // 1 = admin , 2 = vendor , 3 = customer
    address?: string
    status?: boolean
    createdAt?: Date
}
