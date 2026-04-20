class Memory
{
    constructor(rom)
    {
        this._memory = rom;
    }
}

class Emulator
{
    constructor(rom)
    {
        this.memory = new Memory(rom);
    }

    runCPUloop()
    {
        console.log("Doing calculation-things here...");
        console.log("the length of memory is: ", this.memory._memory.length);
    }
}

function runEmulator(rom)
{
    const e = new Emulator(rom);
    e.runCPUloop();
}

const inputElement = document.getElementById("ROM");
inputElement.addEventListener("change", processFiles);

async function processFiles()
{
    const arr = await new Response(this.files[0]).arrayBuffer();
    runEmulator(new Uint8Array(arr));
    console.log("see ya");
}


