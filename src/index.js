import PluginComponent from "./plugin";
import { markdownRenderer } from "inkdrop";
import CodeMirror from "codemirror";

const PLUGIN_MODE_INFO = {
  name: "plugin",
  mime: "application/javascript",
  mode: "javascript",
};

module.exports = {
  activate() {
    if (markdownRenderer) {
      markdownRenderer.remarkCodeComponents["plugin"] = PluginComponent;
    }
    if (CodeMirror) {
      CodeMirror.modeInfo.push(PLUGIN_MODE_INFO);
    }
  },

  deactivate() {
    if (markdownRenderer) {
      const { remarkPlugins, remarkCodeComponents } = markdownRenderer;
      const i = remarkPlugins.indexOf(PluginComponent);
      if (i >= 0) remarkPlugins.splice(i, 1);
      if (remarkCodeComponents.plugin === PluginComponent) {
        delete remarkCodeComponents.plugin;
      }
    }
    if (CodeMirror) {
      const { modeInfo } = CodeMirror;
      const i = modeInfo.indexOf(PLUGIN_MODE_INFO);
      if (i >= 0) modeInfo.splice(i, 1);
    }
  },
};
