export default class Timer {
    constructor(root) {
        root.innerHTML = Timer.getHTML();

        this.el = {
            minutes: root.querySelector(".timer__part--minutes"),
            seconds: root.querySelector(".timer__part--seconds"),
            control: root.querySelector(".timer__btn--control"),
            reset: root.querySelector(".timer__btn--reset"),
        };

        this.interval = null;
        this.remainingSeconds = 90;

        this.el.control.addEventListener("click", () => {
            // TODO: Add in the code
        });

        this.el.reset.addEventListener("click", () => {
            // TODO: Add in the code
        });

        this.updateInterfaceTime();
    }

    updateInterfaceTime() {
        const minutes = Math.floor(this.remainingSeconds / 60);
        const seconds = this.remainingSeconds % 60;
        this.el.minutes.textContent = minutes.toString().padStart(2, "0");
        this.el.seconds.textContent = seconds.toString().padStart(2, "0");
    }

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
