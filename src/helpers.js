export function determineTimeframeString(timeframe) {
    switch(timeframe) {
        case 'overall':
            return 'overall'
        case '7day':
            return 'in the past 7 days';
        case '1month':
            return 'in the past month';
        case '3month':
            return 'in the past 3 months';
        case '6month':
            return 'in the past 6 months';
        case '12month':
            return 'in the past year';
        default:
            return '';
    }
}
