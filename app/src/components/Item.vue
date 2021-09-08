<template>
  <div>
    <b-row v-if="view == 'Grid'">
      <b-col sm="3" v-for="item in data" :key="item.title">
        <b-card
          class="m-1"
          :title="item.note['title']"
          align="left"
        >
          <b-card-text>
            <b-card-text class="small text-muted">
              <b-icon icon="clock-fill"></b-icon>
              Last updated
              {{ timeSince(new Date(item.note["changed"])) }}
              ago</b-card-text
            >
          </b-card-text>
        </b-card>
      </b-col>
    </b-row>
    <b-row v-else>
      <b-col>
        <b-table
          class="text-left"
          striped
          bordered
          :items="formatTable((x) => !x['tags'])"
        ></b-table>
      </b-col>
    </b-row>
  </div>
</template>
<script>
export default {
  props: ["view", "data"],
  data() {
    return {
        
    };
  },
  methods: {
    /**
     * Nice formatting for human readable dates
     */
    timeSince(date) {
      var seconds = Math.floor((new Date() - date) / 1000);
      var interval = seconds / 31536000;
      if (interval > 1) {
        return Math.floor(interval) + " years";
      }
      interval = seconds / 2592000;
      if (interval > 1) {
        return Math.floor(interval) + " months";
      }
      interval = seconds / 86400;
      if (interval > 1) {
        return Math.floor(interval) + " days";
      }
      interval = seconds / 3600;
      if (interval > 1) {
        return Math.floor(interval) + " hours";
      }
      interval = seconds / 60;
      if (interval > 1) {
        return Math.floor(interval) + " minutes";
      }
      return Math.floor(seconds) + " seconds";
    },
    /**
     * Table formatting
     */
    formatTable(filter) {
      return this.data.filter(filter).map((item) => {
        return {
          title: item.note["title"],
          changed: this.timeSince(item.note["changed"]),
        };
      });
    },
  },
};
</script>