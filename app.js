const { createApp } = Vue;

createApp({
  data() {
    return {
      mode: 'work', // 'work' or 'break'
      timeLeft: 25 * 60,
      timer: null,
      isRunning: false,
    };
  },
  computed: {
    formattedTime() {
      const minutes = Math.floor(this.timeLeft / 60);
      const seconds = this.timeLeft % 60;
      return `${minutes.toString().padStart(2, '0')}:${seconds
        .toString()
        .padStart(2, '0')}`;
    },
  },
  methods: {
    toggleTimer() {
      if (this.isRunning) {
        clearInterval(this.timer);
        this.isRunning = false;
      } else {
        this.timer = setInterval(() => {
          if (this.timeLeft > 0) {
            this.timeLeft--;
          } else {
            clearInterval(this.timer);
            this.isRunning = false;
            alert(`${this.mode === 'work' ? 'Work' : 'Break'} session over!`);
          }
        }, 1000);
        this.isRunning = true;
      }
    },
    resetTimer() {
      clearInterval(this.timer);
      this.isRunning = false;
      this.timeLeft = this.mode === 'work' ? 25 * 60 : 5 * 60;
    },
    switchMode(newMode) {
      this.mode = newMode;
      this.resetTimer();
    },
  },
}).mount('#app');
