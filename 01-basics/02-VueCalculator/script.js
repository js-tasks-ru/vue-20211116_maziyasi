import { createApp } from './vendor/vue.esm-browser.js';

// Создайте Vue приложение
const app = createApp({
    data() {
        const mathSigns = [
            { sign: 'sum', calcFunc: (v1, v2) => v1 + v2, icon: '➕' },
            { sign: 'subtract', calcFunc: (v1, v2) => v1 - v2, icon: '➖' },
            { sign: 'multiply', calcFunc: (v1, v2) => v1 * v2, icon: '✖' },
            { sign: 'divide', calcFunc: (v1, v2) => v1 / v2, icon: '➗' },
          ];

          return {
            firstValue: 0,
            secondValue: 0,
            mathSigns: mathSigns,
            selectedMathSign: mathSigns[0],
          };
    },
    computed: {
        result() {
          const selectedCalcFunc = this.selectedMathSign.calcFunc;
          return selectedCalcFunc(this.firstValue, this.secondValue);
        },
      }
}).mount('#app');