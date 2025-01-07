import TimerLogic from "./TimerLogic.js";

export default class TimerUI {
    constructor(root, initialMinutes = 0) {
        root.innerHTML = TimerUI.getHTML();

        this.logic = new TimerLogic(initialMinutes);
        this.el = {
            minutes: root.querySelector(".timer__part--minutes"),
            seconds: root.querySelector(".timer__part--seconds"),
            control: root.querySelector(".timer__btn--control"),
            reset: root.querySelector(".timer__btn--reset"),
        };

        this.updateTime();
        this.updateControls();

        this.el.control.addEventListener("click", () => this.toggle());
        this.el.reset.addEventListener("click", () => this.reset());
    }

    updateTime() {
        const { minutes, seconds } = this.logic.getRemainingTime();
        this.el.minutes.textContent = minutes.toString().padStart(2, "0");
        this.el.seconds.textContent = seconds.toString().padStart(2, "0");
    }

    updateControls() {
        if (this.logic.interval === null) {
            this.el.control.innerHTML = `<span class="material-icons">play_arrow</span>`;
            this.el.control.classList.add("timer__btn--start");
            this.el.control.classList.remove("timer__btn--stop");
        } else {
            this.el.control.innerHTML = `<span class="material-icons">pause</span>`;
            this.el.control.classList.add("timer__btn--stop");
            this.el.control.classList.remove("timer__btn--start");
        }
    }

    toggle() {
        if (this.logic.interval === null) {
            this.logic.start(() => this.updateTime());
        } else {
            this.logic.stop();
        }
        this.updateControls();
    }

    reset() {
        const inputMinutes = parseInt(
            prompt("Enter the number of minutes (0-59):"),
            10
        );

        if (inputMinutes < 60) {
            this.logic.reset(inputMinutes);
            this.updateTime();
        } else {
            alert("Please enter a valid number between 0 and 59.");
        }
    }

    static getHTML() {
        return ` 
            <span class="timer__part timer__part--minutes">00</span>
            <span class="timer__part">:</span>
            <span class="timer__part timer__part--seconds">00</span>
            <button type="button" class="timer__btn timer__btn--control timer__btn--start">
                <span class="material-icons"> play_arrow </span>
            </button>
            <button type="button" class="timer__btn timer__btn--reset">
                <span class="material-icons"> timer </span>
            </button>`;
    }
}
