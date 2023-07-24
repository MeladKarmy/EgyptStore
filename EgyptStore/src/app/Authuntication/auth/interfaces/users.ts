export interface IUsers {
    firstName: String
    lastName: String
    fullName?: String
    phone: Number
    email: String
    gender: String
    password: String
    status?: Boolean
    comments?:
    {
        proudctId: Number
        userId: String
    }
    image: String
    Role?: ['client', 'admin']
}