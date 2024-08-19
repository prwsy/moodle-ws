export interface MoodleUser {
    username: string;
    password: string;
    firstname: string;
    lastname: string;
    email: string;
}

export interface EnrollmentPayload {
    roleid: number;
    userid: number;
    courseid: number;
    suspend?: number;
}

export interface UpdateMoodleUserPayload {
    id: number;
    username: string;
    password: string;
    firstname: string;
    lastname: string;
    email: string;
}

export interface UnEnrollPayload {
    roleid: number;
    userid: number;
    courseid: number;
}

export interface GetMoodleUserQuery {
    email: string
}