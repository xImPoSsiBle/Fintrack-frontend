export const getGoalColor = (percent: number) => {
    if (percent < 30) {
        return {
            text: 'text-red-500',
            bg: 'bg-red-500',
        }
    }

    if (percent < 70) {
        return {
            text: 'text-yellow-500',
            bg: 'bg-yellow-500',
        }
    }

    return {
        text: 'text-green-500',
        bg: 'bg-green-500',
    }
}