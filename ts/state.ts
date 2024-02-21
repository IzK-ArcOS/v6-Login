import { Log } from "$ts/console";
import { Store } from "$ts/writable";
import { LogLevel } from "$types/console";
import { LoginState, LoginStates } from "$types/state";
import { Login } from "./main";
import { LoginStateWatcher } from "./watch";

export class LoginStateHandler {
  public readonly current = Store<LoginState>();
  public readonly watcher: LoginStateWatcher;
  public readonly store: LoginStates;
  public readonly startState: string;
  public readonly id: string;

  constructor(id: string, store: LoginStates, startState: string, public runtime: Login) {
    this.id = id;
    this.store = store;
    this.startState = startState;
    Log(
      "states",
      `Created LoginStateHandler "${id}" with ${store.size} states (starts at ${startState})`
    );

    this.watcher = new LoginStateWatcher(this);
  }

  public navigate(stateKey: string) {
    Log("states", `LoginStateHandler.navigate[${this.id}]: Navigating to "${stateKey}"`);

    const has = this.store.has(stateKey);

    if (!has)
      Log(
        "states",
        `LoginStateHandler.navigate[${this.id}]: No such state ${stateKey}, falling back to ${this.startState}`,
        LogLevel.warn
      );

    const state = this.store.get(has ? stateKey : this.startState);

    if (state.onload) state.onload(this.runtime);

    document.title = `ArcOS | ${state.name}`;

    this.current.set(state);

    return true;
  }
}
