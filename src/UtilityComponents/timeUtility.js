export function convertTimeToMilli(count) {
    const mainSeconds = parseInt(count / 100);
    const decimalSeconds = parseInt((count % 100).toFixed(2));
    return `${mainSeconds} : ${decimalSeconds}`;
}

export function convertTimeToProgress(count, time) {
    if (time === 0) return;
    return 100 - count / time;
}

export function convertTimeToMMSS(time) {
    const seconds = parseInt(time % 60);
    const minutes = parseInt((time - seconds) / 60);
    return `${pad(minutes)} : ${pad(seconds)}`;
}
function pad(number) {
    return (number < 10 ? "0" : "") + number;
}

export function convertMilliSecToSec(time) {
    let seconds = Math.floor(time / 1000);
    let millisec = (Math.floor(time % 1000) / 10).toFixed(0);
    return `${seconds}.${millisec}`;
}
export function convertToMinutes(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
    return `${pad(minutes)} : ${pad(seconds)}`;
}

export function formatCountdownTime(time){
    let seconds = Math.floor(time / 1000);
    let millisec = (Math.floor(time % 1000) / 10).toFixed(0);

    if (millisec < 10) {
        millisec = `0${millisec}`;
    }
    if (seconds < 10) {
        seconds = `0${seconds}`;
    }

    return `${seconds}:${millisec}`;
}