export default class TimerLogic {
    constructor(initialMinutes = 0) {
        this.remainingSeconds = initialMinutes * 60;
        this.interval = null;
    }

    start(callback) {
        if (this.remainingSeconds === 0 || this.interval !== null) return;

        this.interval = setInterval(() => {
            this.remainingSeconds--;
            callback(this.remainingSeconds);

            if (this.remainingSeconds === 0) {
                this.stop();
            }
        }, 1000);
    }

    stop() {
        clearInterval(this.interval);
        this.interval = null;
    }

    reset(newMinutes) {
        this.stop();
        this.remainingSeconds = newMinutes * 60;
    }

    getRemainingTime() {
        const minutes = Math.floor(this.remainingSeconds / 60);
        const seconds = this.remainingSeconds % 60;
        return { minutes, seconds };
    }
}
