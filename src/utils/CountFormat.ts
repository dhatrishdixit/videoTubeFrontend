export function CountFormat(count: number) {
    if (count > 1000) {
        const formattedCount = (count / 1000).toFixed(1);
        return formattedCount.endsWith('.0') ? `${formattedCount.slice(0, -2)}K` : `${formattedCount}K`;
    }
    if (count > 1000000) {
        const formattedCount = (count / 1000000).toFixed(1);
        return formattedCount.endsWith('.0') ? `${formattedCount.slice(0, -2)}M` : `${formattedCount}M`;
    }
    if (count > 1000000000) {
        const formattedCount = (count / 1000000000).toFixed(1);
        return formattedCount.endsWith('.0') ? `${formattedCount.slice(0, -2)}B` : `${formattedCount}B`;
    }

    return count;
}
