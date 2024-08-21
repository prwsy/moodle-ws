import { EnrollmentPayload, MoodleUser, UnEnrollPayload, UpdateMoodleUserPayload } from "./types";

export interface MwsService {
    getUser(email: string): Promise<any>;
    createUser(user: MoodleUser): Promise<any>;
    updateUser(user: UpdateMoodleUserPayload): Promise<any>;
    enrollUser(enrollmentPayload: EnrollmentPayload[]): Promise<any>;
    unEnrollUser(unEnrollPayload: UnEnrollPayload[]): Promise<any>;
}