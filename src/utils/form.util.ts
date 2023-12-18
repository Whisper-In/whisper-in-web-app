export type Validation = {
    pattern?: RegExp,
    min?: number,
    max?: number,
    minLength?: number,
    maxLength?: number,
    customErrors?: {
        pattern?: string;
        min?: string;
        max?: string;
        minLength?: string;
        maxLength?: string;
    }
}

export const ERRORS = {
    PATTERN: "Input does not match requirements.",
    MIN_LENGTH: "At least",
    MAX_LENGTH: "Cannot have more than",
    MIN: "Amount has to be at least",
    MAX: "Amount has to be less than"   
}

export const Validator = (value?: string, validations?: Validation[]) => {
    if (validations) {
        const amount = Number.parseFloat(value?.toString() ?? "0");

        for (let validation of validations) {
            if (validation.pattern) {
                if (!value?.match(validation.pattern)?.length) {
                    return validation.customErrors?.pattern ?? ERRORS.PATTERN;
                }
            } else if (validation.minLength) {
                if ((value?.length ?? 0) < validation.minLength) {
                    return validation.customErrors?.minLength ?? `${ERRORS.MIN_LENGTH} ${validation.minLength} ${validation.minLength > 1 ? 'characters' : 'character'} are required.`;
                }
            } else if (validation.maxLength) {
                if ((value?.length ?? 0) > validation.maxLength) {
                    return validation.customErrors?.maxLength ?? `${ERRORS.MAX_LENGTH} ${validation.maxLength} ${validation.maxLength > 1 ? 'characters' : 'character'}.`;
                }
            } else if (validation.min) {                
                if (isNaN(amount) || amount < validation.min) {
                    return validation.customErrors?.min ?? `${ERRORS.MIN} ${validation.min}`;
                }
            } else if (validation.max) {
                const amount = Number.parseFloat(value?.toString() ?? "0");

                if (amount > validation.max) {
                    return validation.customErrors?.max ?? `${ERRORS.MAX} ${validation.min}`;
                }
            }
        }
    }

    return undefined;
}
