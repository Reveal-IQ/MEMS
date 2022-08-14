// To generate current timestamp
module.exports.getTimestamp = async function(){
    
    // Current date
    let newDate = new Date();
    
    let date = newDate.getUTCDate() < 10 ? `0${newDate.getUTCDate()}` : newDate.getUTCDate();
    let month = parseInt(newDate.getUTCMonth() + 1) < 10 ? `0${parseInt(newDate.getUTCMonth() + 1)}` : parseInt(newDate.getUTCMonth() + 1);
    let year = newDate.getUTCFullYear();
    let hour = newDate.getUTCHours() < 10 ? `0${newDate.getUTCHours()}` : newDate.getUTCHours();
    let minutes = newDate.getUTCMinutes() < 10 ? `0${newDate.getUTCMinutes()}` : newDate.getUTCMinutes();
    let seconds = newDate.getUTCSeconds() < 10 ? `0${newDate.getUTCSeconds()}` : newDate.getUTCSeconds();

    return `${date}/${month}/${year} ${hour}:${minutes}:${seconds} UTC`;
}