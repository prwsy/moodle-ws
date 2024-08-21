import dotenv from 'dotenv';
import { MwsClient } from './mws-client';
import { MoodleUser, EnrollmentPayload, UnEnrollPayload, UpdateMoodleUserPayload } from './interfaces/types';

dotenv.config();

const baseUrl = process.env.MWS_URL
const user = process.env.MWS_USER
const pass = process.env.MWS_PASS
const service = process.env.MWS_SERVICE

if (!baseUrl || !user || !pass || !service) throw new Error('set .env variables')

const client = new MwsClient(baseUrl, user, pass, service)

export async function getUser(email: string) {
    return await client.getUser(email)
}

export async function createUser(user: MoodleUser) {
    return await client.createUser(user)
}

export async function updateUser(user: UpdateMoodleUserPayload) {
    return await client.updateUser(user)
}

export async function enrollUser(enrollmentPayload: EnrollmentPayload[]) {
    return await client.enrollUser(enrollmentPayload)
}

export async function unEnrollUser(unEnrollPayload: UnEnrollPayload[]) {
    return await client.unEnrollUser(unEnrollPayload)
}

export { MwsClient, MoodleUser, UpdateMoodleUserPayload, EnrollmentPayload, UnEnrollPayload }