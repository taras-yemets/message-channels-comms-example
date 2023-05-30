import * as comlink from "comlink";
import { CounterAPIFactory } from "./types";

self.addEventListener("message", (event) => {
  const factory: CounterAPIFactory = (initial) => {
    return {
      [comlink.proxyMarker]: true,
      value: initial,
      increment() {
        this.value++;
        return this.value;
      },
    };
  };

  comlink.expose(factory, event.data.port);
});
