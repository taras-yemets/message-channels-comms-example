import * as comlink from "comlink";
import Worker from "./worker?worker";
import { CounterAPIFactory } from "./types";

// const worker = new Worker(new URL("./worker.js", import.meta.url));
// const { port1, port2 } = new MessageChannel();

// worker.postMessage({ port: port2 }, [port2]);

export async function setupCounter(element: HTMLButtonElement) {
  const { port1, port2 } = new MessageChannel();
  port1.start();
  port1.addEventListener("message", (event) => {
    console.log("port1", event.data);
  });
  const { port1: intermediatePort1, port2: intemediatePort2 } = new MessageChannel();
  port2.postMessage({ value: intermediatePort1 }, [intermediatePort1]);

  // const setCounter = (count: number) => {
  //   element.innerHTML = `count is ${count}`;
  // };
  // const intitialValue = 1;
  // const createCounter = comlink.wrap<CounterAPIFactory>(port1);
  // const counter = await createCounter(intitialValue);
  // setCounter(await counter.value);
  // element.addEventListener("click", async () => {
  //   await counter.increment();
  //   setCounter(await counter.value);
  // });
}
