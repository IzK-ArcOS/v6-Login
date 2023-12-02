import { fromBase64, toBase64 } from "$ts/base64";
import { Log } from "$ts/console";
import { Authenticate } from "$ts/server/user/auth";
import { PrimaryState, StateHandler } from "$ts/states";
import { ConnectedServer } from "$ts/stores/server";
import { UserDataStore } from "$ts/stores/user";
import { sleep } from "$ts/util";
import { Store } from "$ts/writable";
import { State } from "$types/state";
import { AllUsers, type UserData } from "$types/user";
import { get } from "svelte/store";
import { LoginStates } from "./store";

export class Login {
  public UserName = Store<string>();
  public UserCache = Store<AllUsers>();
  public userBackground = Store<string>("img15");
  public stateHandler: StateHandler;

  constructor(initialState: string, doOnMount = true) {
    Log("Login", `Creating new login class`);

    this.stateHandler = new StateHandler("Login", LoginStates, initialState);

    this.UserCache.subscribe(() => this.updateLoginBackground());
    this.UserName.subscribe(() => this.updateLoginBackground());

    if (doOnMount) this.onMount();
  }

  private async onMount() {
    const allUsers = /* await getUsers() */ [];
    const remembered = localStorage.getItem("arcos-remembered-token");
    const loginState = PrimaryState.current.get();
    const currentApi = ConnectedServer.get();
    const isFreshApi = !Object.keys(allUsers).length && !remembered;
    const stateIsIncoming = loginState
      ? loginState.key != "shutdown" && loginState.key != "restart"
      : true;

    Log("Login", `isFreshApi=${isFreshApi} StateIsIncoming=${stateIsIncoming}`);

    if (isFreshApi) {
      if (!currentApi) return PrimaryState.navigate("fts");

      return this.stateHandler.navigate("newuserauth");
    }

    if (!loginState)
      this.stateHandler.navigate(remembered ? "autologin" : "existinguserauth");
    if (!remembered || !stateIsIncoming) return;

    const [username, password] = fromBase64(remembered).split(":");

    this.setUser(username);

    const userdata = await this.Authenticate(username, password);

    if (!userdata) {
      this.stateHandler.navigate("existinguserauth");

      localStorage.removeItem("arcos-remembered-token");

      return;
    }

    this.proceed(userdata, username);
  }

  private updateLoginBackground(v?: AllUsers) {
    v = v || get(this.UserCache);

    if (!v) return this.userBackground.set("img15");

    const username = get(this.UserName);
    const user = v[username];

    if (!user || !user.acc || !user.acc.loginBackground)
      return this.userBackground.set("img15");

    this.userBackground.set(user.acc.loginBackground);
  }

  public async Authenticate(username: string, password: string) {
    const token = toBase64(`${username}:${password}`);
    const userdata = await Authenticate(username, password);

    if (!userdata) return false;

    localStorage.setItem("arcos-remembered-token", token);
    UserDataStore.set(userdata);

    this.setUser(username);

    return userdata;
  }

  public async proceed(userdata: Object, username: string, delay = 1500) {
    Log("Login", `Proceeding to desktop after ${delay / 1000} seconds`);

    this.UserName.set(username);

    this.setUser(username);
    UserDataStore.set(userdata as UserData);

    await sleep(delay);

    PrimaryState.navigate("desktop");
  }

  public setUser(username: string) {
    this.UserName.set(username);
  }
}
