import { PrimaryState } from "$ts/states";
import { sleep } from "$ts/util";
import { LoginState } from "$types/state";
import AutoLogin from "../Components/Pages/AutoLogin.svelte";
import ExistingUser from "../Components/Pages/ExistingUser.svelte";
import NewUser from "../Components/Pages/NewUser.svelte";
import Selector from "../Components/Pages/Selector.svelte";
import { Login } from "./main";

export const LoginStates = new Map<string, LoginState>([
  [
    "autologin",
    {
      name: "Auto Login",
      content: AutoLogin,
      attribs: {
        topbar: false,
        darken: true,
        className: "center-flex",
      },
      key: "autologin",
    },
  ],
  [
    "existinguserauth",
    {
      name: "Existing User Login",
      content: ExistingUser,
      attribs: {
        topbar: false,
        darken: true,
        className: "center-flex",
      },
      key: "existinguserauth",
    },
  ],
  [
    "newuserauth",
    {
      name: "New User",
      content: NewUser,
      attribs: {
        topbar: false,
        darken: true,
        className: "center-flex",
      },
      key: "newuserauth",
    },
  ],
  [
    "selector",
    {
      name: "Selector",
      content: Selector,
      attribs: {
        topbar: true,
        darken: false,
        className: "center-flex",
      },
      key: "selector",
    },
  ],
  [
    "shutdown",
    {
      name: "Shutdown",
      content: AutoLogin,
      attribs: {
        topbar: false,
        darken: true,
        className: "center-flex",
      },
      key: "shutdown",
      onload() {
        setTimeout(() => {
          PrimaryState.navigate("turnedoff");
        }, 2000);
      },
    },
  ],
  [
    "restart",
    {
      name: "Restart",
      content: AutoLogin,
      attribs: {
        topbar: false,
        darken: true,
        className: "center-flex",
      },
      key: "restart",
      onload() {
        setTimeout(() => {
          location.reload();
        }, 2000);
      },
    },
  ],
  [
    "logoff",
    {
      name: "Logoff",
      content: AutoLogin,
      attribs: {
        topbar: false,
        darken: true,
        className: "center-flex",
      },
      key: "logoff",
      async onload(runtime: Login) {
        runtime.userBackground.set(null);
        /* runtime.UserCache.set(null); */
        /* runtime.UserName.set(UserName.get()); */

        runtime.lockBackground()

        await sleep(2000);

        runtime.stateHandler.navigate("selector");

        await sleep(200);

        runtime.unlockBackground();
      }
    },
  ],
]);
