import Fuse from "fuse.js";
import { commandMap } from "./commands";

const fuse = new Fuse(Object.keys(commandMap), { threshold: 0.3 });
export default fuse;