import { Ch8Byte } from "./bytes";

function validWord(nr)
{
    if (nr < 0)
        return false;
    if (nr > 0xFFFF)
        return false;
    return true;
}

class Ch8Word
{
    constructor(nr)
    {
        if (!validWord(nr)) //constructors should never throw exceptions as a rule
            throw new Error("invalid number");
        this._nr = nr;
    }

    toBytes()
    {
        const high = new Ch8Byte(this._nr >> 8);
        const low = new Ch8Byte(this._nr & 0xFF);
        return [high,low];
    }
}


export {Ch8Word};