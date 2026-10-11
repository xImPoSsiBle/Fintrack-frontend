export const getErrorMessage = (error: unknown, fallback = 'Произошла ошибка') => {
    if (typeof error === 'object' && error !== null && 'data' in error) {
        const data = error.data

        if (
            typeof data === 'object' &&
            data !== null &&
            'detail' in data &&
            typeof data.detail === 'string'
        ) {
            return data.detail
        }
    }

    if (error instanceof Error) {
        return error.message
    }

    return fallback
}