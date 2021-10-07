<template>
  <div>
      <b-row v-if="view == 'Grid'">
        <b-col sm="3" v-for="item in data" :key="item.id">
          <router-link :to="{ name: 'Editor', params: { id: item.id } }">
          <b-card
            class="m-1"
            :title="item['title']"
            align="left"
          >
            <b-card-text>
              <b-card-text class="small text-muted">
                <b-icon icon="clock-fill"></b-icon>
                Last updated
                {{ $store.state.Utils.timeSince(new Date(item['changed'])) }}
                ago</b-card-text
              >
            </b-card-text>
          </b-card>
          </router-link>
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