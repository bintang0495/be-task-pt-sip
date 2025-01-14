import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
    ){}

    async getAccessToken(): Promise<string> {
        const url = this.configService.get<string>('URL_API_SATUSEHAT_TOKEN');
        const clientId = this.configService.get<string>('CLIENT_ID');
        const clientSecret = this.configService.get<string>('CLIENT_SECRET');

        const body = new URLSearchParams({
            client_id: clientId,
            client_secret: clientSecret,
        });

        const response = await firstValueFrom(
            this.httpService.post(url, body, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }));

        return response.data.access_token;
    }
}
