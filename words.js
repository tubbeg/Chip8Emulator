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

    getNibble(nth)
    {
        // 0xABCD first nibble is least significant
        // so getNibble(4) results in A
        if (nth < 5 && nth > 0)
        {
            const shiftBy = (nth - 1) * 4 //4 bits in a nibble
            const res = this._nr >> shiftBy;
            return res & 0xF;
        }
        throw new Error("invalid parameter", nth);
    }

    getHighByte()
    {
        const l = 0xFF00 & this._nr;
        return new Ch8Byte(l >> 8);
    }

    getLowByte()
    {
        const l = 0xFF & this._nr;
        return new Ch8Byte(l);
    }
}


export {Ch8Word};