import { Ch8Byte } from "./bytes.js";

function typedArrayToMemory(arr)
{
    //typed arrays are really great but also slightly annoying
    const m = Array.from(arr);
    const l = m.map((data) => {console.log(data); return new Ch8Byte(data)});
    return l;
}

class Memory
{
    constructor(rom)
    {
        this._memory = typedArrayToMemory(rom);
        console.log("memory test", this._memory);
    }
}


export {Memory};