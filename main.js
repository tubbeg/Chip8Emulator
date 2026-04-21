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

class MyStuff
{
    constructor()
    {
        this.a = 100;
    }
}

const t = new MyStuff();

console.log("TPYE HERE", Object.prototype.toString.call(t));
