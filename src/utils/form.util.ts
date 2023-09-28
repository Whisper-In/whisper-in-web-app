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
export const Validator = (value?: string, validations?: Validation[]) => {
    if (validations) {
        const amount = Number.parseFloat(value?.toString() ?? "0");

        for (let validation of validations) {
            if (validation.pattern) {
                if (!value?.match(validation.pattern)?.length) {
                    return validation.customErrors?.pattern ?? "Input does not match requirements.";
                }
            } else if (validation.minLength) {
                if ((value?.length ?? 0) < validation.minLength) {
                    return validation.customErrors?.minLength ?? `At least ${validation.minLength} ${validation.minLength > 1 ? 'characters' : 'character'} are required.`;
                }
            } else if (validation.maxLength) {
                if ((value?.length ?? 0) > validation.maxLength) {
                    return validation.customErrors?.maxLength ?? `Cannot have more than ${validation.maxLength} ${validation.maxLength > 1 ? 'characters' : 'character'}.`;
                }
            } else if (validation.min) {                
                if (isNaN(amount) || amount < validation.min) {
                    return validation.customErrors?.min ?? `Amount has to be at least ${validation.min}`;
                }
            } else if (validation.max) {
                const amount = Number.parseFloat(value?.toString() ?? "0");

                if (amount > validation.max) {
                    return validation.customErrors?.max ?? `Amount has to be less than ${validation.min}`;
                }
            }
        }
    }

    return undefined;
}
