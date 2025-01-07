export default class Timer {
    constructor(root, initialMinutes = 0) {
        root.innerHTML = Timer.getHTML();

        this.el = {
            minutes: root.querySelector(".timer__part--minutes"),
            seconds: root.querySelector(".timer__part--seconds"),
            control: root.querySelector(".timer__btn--control"),
            reset: root.querySelector(".timer__btn--reset"),
        };

        this.interval = null;
        this.remainingSeconds = initialMinutes * 60;

        this.el.control.addEventListener("click", () => this.toggle());

        this.el.reset.addEventListener("click", () => this.reset());
    }
    // Update the timer display
    updateInterfaceTime() {
        const minutes = Math.floor(this.remainingSeconds / 60);
        const seconds = this.remainingSeconds % 60;
        this.el.minutes.textContent = minutes.toString().padStart(2, "0");
        this.el.seconds.textContent = seconds.toString().padStart(2, "0");
    }

    // Update control button
    updateInterfaceControls() {
        if (this.interval === null) {
            this.el.control.innerHTML = `<span class="material-icons">play_arrow</span>`;
            this.el.control.classList.add("timer__btn--start");
            this.el.control.classList.remove("timer__btn--stop");
        } else {
            this.el.control.innerHTML = `<span class="material-icons">pause</span>`;
            this.el.control.classList.add("timer__btn--stop");
            this.el.control.classList.remove("timer__btn--start");
        }
    }

    // Toggle between start and stop
    toggle() {
        if (this.interval === null) {
            this.start();
        } else {
            this.stop();
        }
    }

    // Reset the timer with user input
    reset() {
        const inputMinutes = prompt("Enter the number of minutes (0-59):");

        if (inputMinutes < 60) {
            this.stop();
            this.remainingSeconds = inputMinutes * 60;
            this.updateInterfaceTime();
        }
    }

    // Start the timer
    start() {
        if (this.remainingSeconds === 0) return;

        this.interval = setInterval(() => {
            this.remainingSeconds--;
            this.updateInterfaceTime();

            if (this.remainingSeconds === 0) {
                this.stop();
            }
        }, 1000);

        this.updateInterfaceControls();
    }

    // Stop the timer
    stop() {
        clearInterval(this.interval);
        this.interval = null;
        this.updateInterfaceControls();
    }

    // HTML structure generating
    static getHTML() {
        return ` 
			<span class="timer__part timer__part--minutes">00</span>
            <span class="timer__part">:</span>
            <span class="timer__part timer__part--seconds">00</span>
            <button
                type="button"
                class="timer__btn timer__btn--control timer__btn--start"
            >
                <span class="material-icons"> play_arrow </span>
            </button>
            <button type="button" class="timer__btn timer__btn--reset">
                <span class="material-icons"> timer </span>
            </button>`;
    }
}
