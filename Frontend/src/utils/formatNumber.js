const formatNumber = (number) => {
        const formatter = new Intl.NumberFormat('vi-VN');
        return formatter.format(number);
    };

export default formatNumber
