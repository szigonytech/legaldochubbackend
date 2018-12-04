export function uuid() {
    let time = new Date().getTime(), uuid;
    return uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
        const random = (time + Math.random() * 16) % 16 | 0;
        time = Math.floor(time / 16);
        return (c == "x" ? random : (random & 0x3 | 0x8)).toString(16);
    });
}


module.exports = { uuid };