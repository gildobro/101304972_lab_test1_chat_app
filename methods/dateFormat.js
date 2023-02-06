const date = new Date();
const formattedDate = date.toLocaleString('default', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
});

module.exports = formattedDate;