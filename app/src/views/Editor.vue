<template>
  <div>
    <!-- #region Navbar -->
    <b-navbar toggleable="sm" type="dark" variant="primary">
      <b-navbar-toggle target="nav-text-collapse"></b-navbar-toggle>

      <b-navbar-brand href="/">SkyMD</b-navbar-brand>

      <b-collapse id="nav-text-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item :disabled="!ready" @click="Save(data)"><b-icon icon="cloud-upload"></b-icon> Save</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
      <b-avatar variant="light" rounded></b-avatar>
    </b-navbar>
    <!-- #endregion -->
    <!-- #region Save Loader -->
    <transition name="scale">
      <b-progress animated style="border-radius: 0" v-if="value > 0" :max="max">
        <b-progress-bar :value="value" :label="`Saving...`"></b-progress-bar>
      </b-progress>
    </transition>
    <br />
    <!-- #endregion -->
    <!-- #region Notebook -->
    <notebook
      v-if="this.mounted"
      v-show="this.ready"
      v-model="data"
      @ready="Ready()"
    ></notebook>
    <div class="container" v-if="!this.mounted || !this.ready">
      <b-skeleton></b-skeleton>
      <br />
      <b-skeleton width="85%"></b-skeleton>
      <b-skeleton width="55%"></b-skeleton>
      <b-skeleton width="70%"></b-skeleton>
      <b-skeleton-img></b-skeleton-img>
    </div>
    <!-- #endregion -->
  </div>
</template>
<script>
import Notebook from "../components/Notebook.vue";
export default {
  components: {
    Notebook,
  },
  data() {
    return {
      value: 0,
      max: 100,
      data: null,
      mounted: false,
      ready: false,
    };
  },
  methods: {
    /**
     * Wait until the editor is loaded
     */
    Ready() {
      this.ready = true;
    },
    /**
     * Save data to local storage + manufactured loading time for aesthetics
     */
    Save(data) {
      if (!ready) {
        return;
      }
      return new Promise(async (resolve, reject) => {
        let interval = setInterval(() => {
          if (typeof data != "string") {
            data == null;
          }
          localStorage.setItem("SkyNote", data);
          this.value++;
          console.log(this.value);
          if (this.value > this.max) {
            this.value = 0;
            clearInterval(interval);
            resolve();
          }
        }, 30);
      });
    },
  },
  /**
   * Preload data from local storage if it exists
   */
  mounted() {
    this.data = localStorage.getItem("SkyNote") || null;
    this.mounted = true;
  },
};
</script>
<style scoped>
.scale-enter-active,
.scale-leave-active {
  transition: height 1s ease;
  transition-delay: 2s;
}

.scale-enter-from,
.scale-leave-to {
  transition: height 1s ease;
  transition-delay: 2s;
  height: 0;
}
</style>