import axios, { AxiosError } from 'axios';
import { MwsService } from "./interfaces/service";
import { EnrollmentPayload, MoodleUser, UnEnrollPayload, UpdateMoodleUserPayload } from "./interfaces/types";

export class MwsClient implements MwsService {
    private baseUrl: string;
    private user: string;
    private pass: string;
    private service: string;
    private token: string | null = null;

    constructor(baseUrl: string, user: string, pass: string, service: string) {
        this.baseUrl = baseUrl;
        this.user = user;
        this.pass = pass;
        this.service = service;
    }

    private async generateToken(): Promise<string> {
        if (this.token) return this.token;
        try {
            const response = await axios.get(`${this.baseUrl}/login/token.php`, {
                params: {
                    username: this.user,
                    password: this.pass,
                    service: this.service
                },
            });
            if (response.data.token) {
                this.token = response.data.token;
                return this.token as string;
            } else {
                throw new Error('Token not found in response');
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                throw new Error(`Failed to obtain token: ${error.message}`);
            }
            throw error;
        }
    }

    private async callWebService(functionName: string, params: any): Promise<any> {
        try {
            const token = await this.generateToken();
            const url = `${this.baseUrl}/webservice/rest/server.php`;
            const response = await axios.get(url, {
                params: {
                    wstoken: token,
                    wsfunction: functionName,
                    moodlewsrestformat: 'json',
                    ...params,
                },
            });
            return response.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                throw new Error(`Web service call failed: ${error.message}`);
            }
            throw error;
        }
    }

    async getUser(email: string): Promise<any> {
        try {
            const criteria = { key: 'email', value: email }
            const response = await this.callWebService('core_user_get_users', {
                criteria: [criteria]
            })
            return response['users'][0]
        } catch (error) {
            if (error instanceof AxiosError) {
                throw new Error(`Web service call failed: ${error.message}`);
            }
            throw error;
        }
    }

    async createUser(user: MoodleUser): Promise<any> {
        try {
            const payload = { ...user, country: 'PH', lang: 'en' }
            const response = await this.callWebService('core_user_create_users', {
                users: [payload],
            });
            return response[0]
        } catch (error) {
            throw new Error(`Failed to create user: ${(error as Error).message}`);
        }
    }

    async updateUser(user: UpdateMoodleUserPayload): Promise<any> {
        try {
            const response = await this.callWebService('core_user_update_users', {
                users: [user],
            });
            return response
        } catch (error) {
            throw new Error(`Failed to update user: ${(error as Error).message}`);
        }
    }

    async enrollUser(enrollmenPayload: EnrollmentPayload): Promise<any> {
        try {
            await this.callWebService('enrol_manual_enrol_users', {
                enrolments: [enrollmenPayload],
            });
            return 'enrolled'
        } catch (error) {
            throw new Error(`Web service call failed: ${(error as Error).message}`);
        }
    }

    async unEnrollUser(unEnrollPayload: UnEnrollPayload): Promise<any> {
        try {
            await this.callWebService('enrol_manual_unenrol_users', {
                enrolments: [unEnrollPayload],
            });
            return 'unenrolled'
        } catch (error) {
            throw new Error(`Web service call failed: ${(error as Error).message}`);
        }
    }
}

