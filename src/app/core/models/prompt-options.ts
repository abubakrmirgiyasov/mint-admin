export interface PromptOptions {
    readonly buttons: readonly[string, string];
    readonly heading: string;
    readonly isValid: boolean;
    readonly value?: any;
}