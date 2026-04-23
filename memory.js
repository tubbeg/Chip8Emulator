import { Ch8Byte } from "./bytes.js";
import { createWord } from "./words.js";

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

function debugPrintHex(byte)
{
    const hex = byte.toNumber().toString(16);
    console.log("hex is: ",hex);
}

class Memory
{
    constructor(rom)
    {
        this._memory = typedArrayToMemory(rom);
        console.log("memory test", this._memory);
    }

    readOpcode(pc)
    {
        const pcNr = pc.toNumber();
        const high = this._memory[pcNr];
        const low = this._memory[pcNr + 1];
        console.log(high,low);
        if (high == null || low == null)
        {
            console.log(pcNr, high, low);
            throw new Error();
        }
        console.log("got bytes", high,low);
        debugPrintHex(high);
        debugPrintHex(low);
        const w = createWord(high,low);
        console.log("word is", w.toNumber());
        return w;
    }
}


export {Memory};