import { defineComponent } from './vendor/vue.esm-browser.js';
import UiContainer from './UiContainer.js';
import UiAlert from './UiAlert.js';
import { fetchMeetupById } from './meetupService.js';
import MeetupView from '../06-MeetupView/MeetupView.js';

export default defineComponent({
  name: 'PageMeetup',

  components: {
    UiAlert,
    UiContainer,
    MeetupView,
  },

  data() {
    return {
      meetup: null,
      meetupIsLoaded: false,
      meetupLoadedError: null,
    };
  },

  props: {
    meetupId: {
      type: Number,
      required: true,
    },
  },

  watch: {
    meetupId: {
      handler: function (meetupId) {
        this.updateMeetup(meetupId);
      },
      immediate: true,
    },
  },

  methods: {
    updateMeetup(meetupId) {
      this.meetupIsLoaded = false;
      this.meetupLoadedError = '';

      fetchMeetupById(meetupId)
        .then((meetup) => {
          this.meetup = meetup;
          this.meetupIsLoaded = true;
        })
        .catch((e) => {
          this.meetupLoadedError = e.message;
        });
    },
  },

  template: `
    <div class="page-meetup">
      <MeetupView v-if="meetupIsLoaded" :meetup="meetup"/>

      <ui-container v-else-if="!meetupIsLoaded && !meetupLoadedError">
        <ui-alert>Загрузка...</ui-alert>
      </ui-container>

      <ui-container v-else>
        <ui-alert>{{ meetupLoadedError }}</ui-alert>
      </ui-container>
    </div>`,
});