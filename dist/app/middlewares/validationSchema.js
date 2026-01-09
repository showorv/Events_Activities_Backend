"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSchema = void 0;
const validateSchema = (zodSchema) => {
    return async (req, res, next) => {
        try {
            let parsedBody = req.body;
            if (req.body?.data) {
                if (typeof req.body.data === "string") {
                    try {
                        parsedBody = JSON.parse(req.body.data);
                    }
                    catch {
                        res.status(400).json({
                            success: false,
                            message: "Invalid JSON format in 'data' field",
                        });
                        return;
                    }
                }
                else if (typeof req.body.data === "object") {
                    parsedBody = req.body.data;
                }
            }
            req.body = await zodSchema.parseAsync(parsedBody);
            next();
        }
        catch (error) {
            next(error);
        }
    };
};
exports.validateSchema = validateSchema;
//# sourceMappingURL=validationSchema.js.map