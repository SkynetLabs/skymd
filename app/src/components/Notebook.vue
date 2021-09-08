<template>
  <iframe
    title="Starboard Notebook Sandbox iFrame"
    id="notebook-iframe"
    src="https://unpkg.com/starboard-notebook@0.7.12/dist/index.html"
    sandbox="allow-scripts allow-modals allow-same-origin allow-pointer-lock allow-top-navigation-by-user-activation allow-forms allow-downloads"
    frameborder="0"
    style="width: 100%"
  ></iframe>
</template>
<script>
import { StarboardEmbed } from "starboard-wrap";
import * as iFrameResizer from "iframe-resizer/js/iframeResizer";
export default {
  props: ["value"],
  data() {
    return {
      placeholder: `# %% [markdown]
# Your New Sky Note
Decentralized your thoughts. 
#### Some features 
* Mix Markdown, HTML, CSS and Javascript.
* The file format is a plaintext file, which plays nice with version control systems like git.
* Runs entirely in your browser, everything is static: no server, no setup and no build step.

> Tip: Press the ▶ Play button on the left to run a cell's code.
# %% [javascript]
// You write vanilla Javascript
const greeting = "Hello world!";

// The last statement in a cell will be displayed if it is not undefined.
greeting`,
    };
  },
  mounted() {
    const initialNotebookContent = this.value || this.placeholder;
    const updateContent = (function (data) {
      this.$emit("input", data);
    }).bind(this);
    const ready = (function () {
      this.$emit("ready");
    }).bind(this);

    window.iFrameComponent = iFrameResizer(
      {
        // Check the iframeResizer docs&code for the options here
        autoResize: true,
        checkOrigin: [
          "http://localhost:8080", // Local development
          "http://localhost:8081", // Local development
          "https://unpkg.com",
        ],
        onMessage: (messageData) => {
          // This message is sent when the notebook is ready
          // Respond to this message with the initial content of the notebook.
          ready()
          // The iFrame will send this message multiple times until you set the content.
          // Note that you don't have to reply synchronously: you can wait for the content to be loaded from say a remote server
          if (messageData.message.type === "NOTEBOOK_READY_SIGNAL") {
            window.iFrameComponent[0].iFrameResizer.sendMessage({
              type: "NOTEBOOK_SET_INIT_DATA",
              payload: { content: initialNotebookContent },
            });
            // Whenever the notebook content gets changed (e.g. a character is typed)
            // the entire content is sent to the parent website.
          } else if (messageData.message.type === "NOTEBOOK_CONTENT_UPDATE") {
            updateContent(messageData.message.payload.content);

            // This signal is sent when a save shortcut (e.g. cmd+s on mac) is pressed.
          } else if (messageData.message.type === "NOTEBOOK_SAVE_REQUEST") {
            updateContent(messageData.message.payload.content);
            //            save(); // Implement your own save function..
          }
        },
        onReady: () => { },
        inPageLinks: true,
      },
      document.querySelector("#notebook-iframe")
    );
  },
};
</script>