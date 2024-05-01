import { fromBase64 } from "$ts/base64";
import { Log } from "$ts/console";
import { Authenticate } from "$ts/server/user/auth";
import { getUsers } from "$ts/server/user/get";
import { PrimaryState } from "$ts/states";
import { ConnectedServer } from "$ts/stores/server";
import { UserDataStore } from "$ts/stores/user";
import { sleep } from "$ts/util";
import { Store } from "$ts/writable";
import { AllUsers, type UserData } from "$types/user";
import { get } from "svelte/store";
import { LoginStateHandler } from "./state";
import { LoginStates } from "./store";

export class Login {
  public UserName = Store<string>();
  public UserCache = Store<AllUsers>();
  public userBackground = Store<string>("img15");
  public stateHandler: LoginStateHandler;
  public wallpapered = ["autologin", "existinguserauth", "logoff", "restart", "shutdown"];

  constructor(initialState: string, doOnMount = true) {
    Log("Login", `Creating new login class`);

    this.stateHandler = new LoginStateHandler("Login", LoginStates, initialState, this);

    this.UserCache.subscribe(() => this.updateLoginBackground());
    this.UserName.subscribe(() => this.updateLoginBackground());

    if (doOnMount) this.onMount();
  }

  private async onMount() {
    const allUsers = await getUsers();
    const remembered = localStorage.getItem("arcos-remembered-token");
    const loginState = this.stateHandler.current.get();
    const currentApi = ConnectedServer.get();
    const isFreshApi = !Object.keys(allUsers).length && !remembered;
    const stateIsIncoming = loginState
      ? loginState.key != "shutdown" && loginState.key != "restart"
      : true;

    this.UserCache.set(allUsers);

    Log("Login", `isFreshApi=${isFreshApi} StateIsIncoming=${stateIsIncoming}`);

    if (isFreshApi) {
      if (!currentApi) return PrimaryState.navigate("fts");

      return this.stateHandler.navigate("newuserauth");
    }

    if (!loginState) this.stateHandler.navigate(remembered ? "autologin" : "existinguserauth");
    if (!remembered || !stateIsIncoming) return;

    const [username, password] = fromBase64(remembered).split(":");

    this.setUser(username);

    const userdata = await this.Authenticate(username, password);

    if (!userdata) {
      this.stateHandler.navigate("existinguserauth");

      localStorage.removeItem("arcos-remembered-token");

      return;
    }

    this.proceed(username);
  }

  public updateLoginBackground(v?: AllUsers) {
    Log("Login", "Updating login background");

    const current = this.stateHandler.current.get();

    if (current && !this.wallpapered.includes(current.key)) {
      this.userBackground.set("img15");

      return;
    }

    v = v || get(this.UserCache);

    if (!v) return this.userBackground.set("img15");

    const username = get(this.UserName);
    const user = v[username];

    if (!user || !user.acc || !user.acc.loginBackground) return this.userBackground.set("img15");

    this.userBackground.set(user.acc.loginBackground);
  }

  public async Authenticate(username: string, password: string) {
    Log("Login", `Authenticating as "${username}"`);

    const userdata = await Authenticate(username, password);

    if (!userdata) return false;

    this.setUser(username);

    return userdata;
  }

  public async proceed(username: string, userdata?: UserData, delay = 1500) {
    Log("Login", `Proceeding to desktop after ${delay / 1000} seconds`);

    if (userdata) UserDataStore.set(userdata);

    this.UserName.set(username);
    this.setUser(username);

    await sleep(delay);

    PrimaryState.navigate("desktop");
  }

  public setUser(username: string) {
    Log("Login", `Setting user to ${username}`);

    this.UserName.set(username);
    this.updateLoginBackground();
  }
}
