import { easepick, TimePlugin } from '@easepick/bundle';

function easePicker() {
    const picker = new easepick.create({
        element: document.getElementById('datepicker'),
        css: [
          'https://cdn.jsdelivr.net/npm/@easepick/bundle@1.2.1/dist/index.css',
          'https://cdn.jsdelivr.net/npm/@easepick/time-plugin@1.2.1/dist/index.css',
        ],
        zIndex: 10,
        format: "HH:mm, DD/MM/YY",
        plugins: [TimePlugin]
      })
};


export default easePicker;