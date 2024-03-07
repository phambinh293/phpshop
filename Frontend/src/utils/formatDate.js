import moment from 'moment';
const formatDate = (dateString) => {
    const formattedDate = moment(dateString).format("HH:mm:ss dddd, DD/MM/YYYY");
    return formattedDate;
};

export default formatDate
