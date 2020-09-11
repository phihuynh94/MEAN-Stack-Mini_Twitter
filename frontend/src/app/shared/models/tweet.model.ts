import { Time } from '@angular/common';

export class Tweet {
    userId: string;
    userFullName: string;
    tweet: string;
    hashtag: string[];
    postAt: Date;
}
