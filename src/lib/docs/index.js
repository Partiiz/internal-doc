import account from "./account";
import chat from "./chat";
import home from "./home";
import landing from "./landing";
import login from "./login";

const pages = { landing, login, home, chat, account };

export default Object.keys(pages).map((name) => ({
  name,
  ...pages[name],
}));
