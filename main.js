import { Emulator } from "./emulator.js";

function runEmulator(rom)
{
    const e = new Emulator(rom);
    e.runCPUloop();
}

async function processFiles()
{
    const arr = await new Response(this.files[0]).arrayBuffer();
    runEmulator(new Uint8Array(arr));
    console.log("see ya");
}

const inputElement = document.getElementById("ROM");
inputElement.addEventListener("change", processFiles);