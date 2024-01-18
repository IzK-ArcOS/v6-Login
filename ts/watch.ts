import { Log } from "$ts/console";
import { LoginState } from "$types/state";
import { LoginStateHandler } from "./state";

const WATCHERS: ((state: LoginState) => any)[] = [];

export class LoginStateWatcher {
  constructor(public readonly handler: LoginStateHandler) {
    Log("Login/ts/watch", `Created new LoginStateWatcher for handler ${handler.id}`);

    handler.current.subscribe((v) => this.trigger(v));
  }

  public watch(event: (state: LoginState) => any) {
    const id = this.handler.id;
    Log(
      "state/watch",
      `LoginStateWatcher.watch ${id}: Adding watcher: ${event.toString()}`
    );

    WATCHERS.push(event);

    event(this.handler.current.get());
  }

  public async trigger(state: LoginState) {
    const id = this.handler.id;

    for (const watcher of WATCHERS) {
      Log(
        "states/watch",
        `LoginStateWatcher.trigger ${id}: Triggering watcher: state changing to ${state.key}`
      );

      await watcher(state);
    }
  }
}
