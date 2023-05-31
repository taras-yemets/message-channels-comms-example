import "./style.css";
import typescriptLogo from "./typescript.svg";
import viteLogo from "/vite.svg";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
    <p>
      Open browser console and check logs from <code>src/main.ts</code>.
    </p>
  </div>
`;

function main() {
  const { port1, port2 } = new MessageChannel();
  port1.start();
  port1.addEventListener("message", (event) => {
    console.log("Incoming message on port1", event.data);
  });
  const { port1: anotherPort1, port2: anotherPort2 } = new MessageChannel();
  port2.postMessage({ value: anotherPort1 }, [anotherPort1]);
}

main();
