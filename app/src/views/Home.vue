<template>
  <div>
    <!-- #region Sidebar -->
    <sidebar-menu
      :menu="menu"
      :collapsed="collapsed"
      @toggle-collapse="onToggleCollapse"
    >
      <template v-slot:toggle-icon
        ><b-icon
          :icon="collapsed ? 'chevron-bar-right' : 'chevron-bar-left'"
        ></b-icon
      ></template>
    </sidebar-menu>
    <!-- #endregion -->
    <!-- #region Main Page Content -->
    <div class="container" :class="collapsed ? 'collapsed' : ''">
      <!-- #region Toolbar -->
      <div class="mt-4">
        <b-row>
          <b-col class="text-left">
            <b-dropdown
              id="dropdown-1"
              text="Tags"
              variant="outline-secondary"
              class="m-md-2"
            >
              <template #button-content>
                <span
                  ><b-icon icon="tag-fill" font-scale="1"></b-icon> Tags</span
                >
              </template>

              <b-dropdown-item>First Action</b-dropdown-item>
              <b-dropdown-item>Second Action</b-dropdown-item>
              <b-dropdown-item>Third Action</b-dropdown-item>
              <b-dropdown-divider></b-dropdown-divider>
              <b-dropdown-item active>Active action</b-dropdown-item>
              <b-dropdown-item disabled>Disabled action</b-dropdown-item>
            </b-dropdown>
          </b-col>
          <b-col class="text-right">
            <b-dropdown
              id="dropdown-1"
              text="Layout"
              variant="outline-secondary"
              class="m-md-2"
            >
              <b-dropdown-item>First Action</b-dropdown-item>
              <b-dropdown-item>Second Action</b-dropdown-item>
              <b-dropdown-item>Third Action</b-dropdown-item>
              <b-dropdown-divider></b-dropdown-divider>
              <b-dropdown-item active>Active action</b-dropdown-item>
              <b-dropdown-item disabled>Disabled action</b-dropdown-item>
            </b-dropdown>
          </b-col>
        </b-row>
      </div>
      <br />
      <!-- #endregion -->
      <!-- #region If there less tags than notes then some are untagged. They can have a special section -->
      <b-row v-if="tags.length < data.length">
        <b-col class="col"><hr /></b-col>
        <b-col class="col-auto">Untagged</b-col>
        <b-col class="col"><hr /></b-col>
      </b-row>
      <b-row>
        <b-col sm="3" v-for="item in data" :key="item.title">
          <b-card
            class="m-1"
            v-if="!item['tag']"
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
      <br />
      <!-- #endregion-->
      <!-- #region Make a header for every tag and fill in the notes that belong to it -->
      <div v-for="tag in tags" :key="tag">
        <b-row>
          <b-col class="col"><hr /></b-col>
          <b-col class="col-auto">{{ tag }}</b-col>
          <b-col class="col"><hr /></b-col>
          <br />
        </b-row>
        <b-row class="justify-content-start">
          <b-col
            sm="3"
            v-for="item in data.filter((x) => x['tag'] == tag)"
            :key="item.title"
          >
            <b-card
              class="m-1"
              v-if="item['tag'] == tag"
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
        <br />
      </div>
      <!-- #endregion -->
    </div>
    <!-- #endregion -->
  </div>
</template>

<script>
// @ is an alias to /src
import { BIcon } from "bootstrap-vue";
import "vue-sidebar-menu/dist/vue-sidebar-menu.css";
import { SidebarMenu } from "vue-sidebar-menu";

export default {
  name: "Home",
  components: {
    BIcon,
    SidebarMenu,
  },
  data() {
    return {
      collapsed: true,
      menu: [
        {
          header: true,
          title: "SkyMD",
          hiddenOnCollapse: true,
        },
        {
          href: "/",
          title: "New Note",
          icon: {
            element: "b-icon",
            attributes: {
              icon: "file-earmark-plus"
            }
          }
        },
      ],
      data: [
        { note: { title: "Sky MD", changed: 1629328556890 } },
        { tag: "🔥", note: { title: "Hot takes", changed: 1629346676313 } },
        { tag: "🔥", note: { title: "🌶", changed: 1629346676313 } },
        {
          tag: "PANCAKES",
          note: {
            title: "How to Improve Your Pancake Game",
            changed: 1629328556890,
          },
        },
        {
          tag: "PANCAKES",
          note: {
            title: "I ate pancakes for breakfast today",
            changed: 1629346808004,
          },
        },
        { tag: "PANCAKES", note: { title: "🥞", changed: 1629346808004 } },
      ],
    };
  },
  computed: {
    /**
     * Array of all existing tags
     */
    tags() {
      if (this.data) {
        // get tags from data
        let result = this.data.map((x) => {
          if (x["tag"]) {
            return x.tag;
          }
        });
        // filter out the null ones
        result = result.filter((x) => x != null);
        //filter out duplicates
        result = [...new Set(result)];
        return result;
      }
    },
  },
  methods: {
    /**
     * Nice formatting for human readable dates
     */
    timeSince(date) {
      console.log(date);
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
     * Menu collapse event
     */
    onToggleCollapse(collapsed) {
      this.collapsed = collapsed;
    },
  },
};
</script>
<style scoped>
.container.collapsed {
  padding-left: 65px;
}
.container {
  padding-left: 355px;
  transition: 0.3s ease;
}
</style>