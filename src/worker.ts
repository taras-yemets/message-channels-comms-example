import * as comlink from "comlink";
import { CounterAPIFactory } from "./types";
import { wrapPortWithSource } from "./utils";

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

  const wrappedPort = wrapPortWithSource(event.data.port, "worker");
  comlink.expose(factory, wrappedPort);
});
