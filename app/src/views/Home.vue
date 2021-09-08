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

              <b-dropdown-item v-for="tag in tags" :key="tag">{{
                tag
              }}</b-dropdown-item>
            </b-dropdown>
          </b-col>
          <b-col class="text-right">
            <b-button
              @click="toggleView()"
              class="text-decoration-none"
              variant="outline-secondary"
              ><b-icon
                :icon="view == 'Grid' ? 'grid3x3-gap-fill' : 'view-list'"
              ></b-icon
            ></b-button>
            <b-dropdown
              id="dropdown-1"
              text="Sort"
              variant="outline-secondary"
              class="m-md-2"
            >
              <b-dropdown-item
                ><span class="float-right"> Grid View</span></b-dropdown-item
              >
              <b-dropdown-item
                ><b-icon icon="view-list"></b-icon
                ><span class="float-right"> List View</span></b-dropdown-item
              >
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
      <item :view="view" :data="filter([{function: filters.untagged}])"></item>
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
        <item :data="filter([{function: filters.tag, params: [tag]}])" :view="view"></item>
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
import Item from "../components/Item.vue";
export default {
  name: "Home",
  components: {
    BIcon,
    SidebarMenu,
    Item,
  },
  data() {
    return {
      collapsed: true,
      view: "Grid",
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
              icon: "file-earmark-plus",
            },
          },
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
    sorts: function() {
      return {
        titleASC: (data) => data.sort((a, b) => a["title"].localCompare(b["title"])),
        titleDSC: (data) => data.sort((a, b) => a["title"].localCompare(b["title"])).reverse(),
      };
    },
    filters: function() {
      return {
        untagged: (data)  => { return data.filter((x) => !x["tag"] )},
        tag: (data, tag) => { return data.filter((x) => x["tag"] == tag )},
        title: (query) => { return data.filter((x) => x['title'].includes(query)) }
      };
    },
  },
  methods: {
    /**
     * Menu collapse event
     */
    onToggleCollapse(collapsed) {
      this.collapsed = collapsed;
    },
    /**
     * Toggle list view vs grid view
     */
    toggleView() {
      this.view = this.view == "Grid" ? "List" : "Grid";
    },
    /**
     * Set up to allow stacking different filters
     */
    filter(filters){
      let data = JSON.parse(JSON.stringify(this.data))
      for(let i = 0; i < filters.length; i++){
        let action = filters[0]
        data = action.function(data, ...(action['params'] || []))
      }
      return data
    },
    /**
     * Set up to allow stacking different sorts
     */
    sort(sorters){
      let data = JSON.parse(JSON.stringify(this.data))
      for(let i = 0; i < sorters.length; i++){
        let action = sorters[0]
        data = action.function(data, ...(action['params'] || []))
      }
      return data
    }
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