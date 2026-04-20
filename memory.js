import { Ch8Byte } from "./bytes.js";


function typedArrayToMemory(arr)
{
    //typed arrays are really great but also slightly annoying
    const m = Array.from(arr);
    const init = [...Array(0x200).keys()].map(_ => {return new Ch8Byte(0)});
    const l = m.map((data) => {console.log(data); return new Ch8Byte(data)});
    const remLength = 0x1000 - (init.length + l.length)
    if (remLength > 0)
    {
        const remainder = Array.from(Array(remLength)).map(_ => {return new Ch8Byte(0)});
        return init.concat(l, remainder);
    }
    else if (remLength == 0)
    {
        return init.concat(l);
    }
    throw new Error("OUT OF MEMORY!");
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