export declare const paymentService: {
    initPayment: (eventId: string, userId: string) => Promise<{
        paymentUrl: any;
        eventId: import("mongoose").Types.ObjectId;
        hostId: import("mongoose").Types.ObjectId;
    }>;
    paymentSuccess: (query: Record<string, string>) => Promise<{
        message: string;
        eventId: string;
        hostId: string;
    }>;
    paymentFail: (query: Record<string, string>) => Promise<{
        message: string;
    }>;
    paymentCancel: (query: Record<string, string>) => Promise<{
        message: string;
    }>;
};
//# sourceMappingURL=payment.service.d.ts.map