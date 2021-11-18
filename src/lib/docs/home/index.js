import { page } from "../../stores";
import Actions from "./Actions.svelte";
import Header from "./Header.svelte";
import Main from "./Main.svelte";
import Navbar from "./Navbar.svelte";
import PublicDisplay from "./PublicDisplay.svelte";

page.update((p) => {
  p.current = Main;
  return p;
});

export default {
  files: {
    Actions,
    Header,
    Main,
    Navbar,
    PublicDisplay,
  },
};
