import { makeInstaller } from "@zoe-element/utils";
import components from "./components";
import "@zoe-element/theme/index.css";

const installer = makeInstaller(components);

export * from "@zoe-element/components";
export default installer;
