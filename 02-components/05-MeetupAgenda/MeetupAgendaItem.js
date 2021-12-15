import { defineComponent } from './vendor/vue.esm-browser.js';

import { agendaItemIcons, agendaItemDefaultTitles } from './meetupService.js';

export default defineComponent({
  name: 'MeetupAgendaItem',


  props: {
    agendaItem: {
      type: Object,
      required: true,
    },
  },

  computed: {
    agendaItemIcon() {
      const agendaItemType = this.agendaItem.type;
      const agendaItemIcon = agendaItemIcons[agendaItemType];

      return `/assets/icons/icon-${agendaItemIcon}.svg`;
    },

    agendaItemTypeIsTalk() {
      const agendaItemType = this.agendaItem.type;

      return agendaItemType === 'talk';
    },

    agendaItemTitle() {
      const agendaItemType = this.agendaItem.type;
      const agendaItemTitle = this.agendaItem.title;

      return agendaItemTitle ?? agendaItemDefaultTitles[agendaItemType];
    },

    agendaItemDescriptionExists() {
      const agendaItemDescription = this.agendaItem.description;

      return agendaItemDescription ? true : false;
    },

    agendaItemTimePeriod() {
      const agendaItemStartsAt = this.agendaItem.startsAt;
      const agendaItemEndsAt = this.agendaItem.endsAt;

      return `${agendaItemStartsAt} - ${agendaItemEndsAt}`;
    }
  },

  template: `
    <div class="agenda-item">
      <div class="agenda-item__col">
        <img :src="agendaItemIcon" class="icon" alt="key" />
      </div>
      <div class="agenda-item__col">{{ agendaItemTimePeriod }}</div>
      <div class="agenda-item__col">
        <h3 class="agenda-item__title">{{ agendaItemTitle }}</h3>
        <p v-if="agendaItemTypeIsTalk" class="agenda-item__talk">
          <span>{{ agendaItem.speaker }}</span>
          <span class="agenda-item__dot"></span>
          <span class="agenda-item__lang">{{ agendaItem.language }}</span>
        </p>
        <p v-if="agendaItemDescriptionExists">{{ agendaItem.description }}</p>
      </div>
    </div>`,
});