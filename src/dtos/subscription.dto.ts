export interface SubscriptionCreateDTO {
    code: string;
    user_id: number;
    amount: number;
    cron: string;
}

export interface SubscriptionUpdateDTO {
    code: string;
    amount: number;
    cron: string;
}