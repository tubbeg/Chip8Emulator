import { Emulator } from "./emulator.js";


async function processFiles()
{
    const arr = await new Response(this.files[0]).arrayBuffer();
    runEmulator(new Uint8Array(arr));
    console.log("see ya");
}

const e = new Emulator();

function runEmulator(rom)
{
    e.init(rom)
    e.runCPUloop();
}


const inputElement = document.getElementById("ROM");
inputElement.addEventListener("change", processFiles);