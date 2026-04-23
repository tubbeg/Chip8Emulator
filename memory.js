import { Ch8Byte } from "./bytes.js";
import { createWord } from "./words.js";

function typedArrayToMemory(arr)
{
    //typed arrays are really great but also slightly annoying
    const m = Array.from(arr);
    const init = [...Array(0x200).keys()].map(_ => {return new Ch8Byte(0)});
    const l = m.map((data) => {return new Ch8Byte(data)});
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
}

class Memory
{
    constructor(rom)
    {
        this._memory = typedArrayToMemory(rom);
    }

    readOpcode(pc)
    {
        const pcNr = pc.toNumber();
        const high = this._memory[pcNr];
        const low = this._memory[pcNr + 1];
        if (high == null || low == null)
        {
            console.log(pcNr, high, low);
            throw new Error();
        }
        //debugPrintHex(high);
        //debugPrintHex(low);
        const w = createWord(high,low);
        return w;
    }

    readIndexBytes(index, nrOfBytes)
    {
        const bytes = [];
        const indexNr = index.toNumber();
        for (let i = indexNr; i < indexNr + nrOfBytes; i++)
        {
            let b = this._memory[i];
            bytes.unshift(b);
        }
        return bytes;
    }
}


export {Memory};