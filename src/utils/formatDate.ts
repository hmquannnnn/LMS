export const FormatDate = (date: string) => {
    const options = {day: '2-digit', month: '2-digit', year: 'numeric'};
    return new Date(date).toLocaleDateString('vi-VN', options);
}