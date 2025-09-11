export {};

declare global {
    interface Window {
        daum?: {
            Postcode: new (opts: any) => {
                embed: (el: HTMLElement, opts?: { q?: string }) => void;
                open: () => void;
            };
        };
    }
}
