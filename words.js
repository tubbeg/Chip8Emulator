import { Ch8Byte } from "./bytes";

function validWord(nr)
{
    if (nr < 0)
        return false;
    if (nr > 0xFFFF)
        return false;
    return true;
}

function isByte(nr)
{
    return nr.constructor.name == "Ch8Byte";
}

function createWord(high, low)
{
    if (isByte(high) && isByte(low))
    {
        const nr = (high.toNumber() << 8) | low.toNumber();
        return new Ch8Word(nr);
    }
    throw new Error("INVALID ARGUMENTS!", high, low);
}

class Ch8Word
{
    constructor(nr)
    {
        if (!validWord(nr)) //constructors should never throw exceptions as a rule
            throw new Error("invalid number");
        this._nr = nr;
    }

    toNumber()
    {
        return this._nr;
    }

    toBytes()
    {
        const high = new Ch8Byte(this._nr >> 8);
        const low = new Ch8Byte(this._nr & 0xFF);
        return [high,low];
    }

    getFourthNibble()
    {
        return this.getNibble(4);
    }

    getThirdNibble()
    {
        return this.getNibble(3);
    }

    getSecondNibble()
    {
        return this.getNibble(2);
    }

    getFirstNibble()
    {
        return this.getNibble(1);
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

    addNumber(nr)
    {
        this._nr = this._nr + nr;
        if (!validWord(this._nr))
            this._nr = this.nr % 0xFFFF;
    }

    increment(nr)
    {
        this.addNumber(1);
    }

    equals(nr)
    {
        return this._nr == nr;
    }

    getNNN()
    {
        return this._nr & 0x0FFF;
    }

    getNN()
    {
        return this._nr & 0x00FF;
    }
}


export {Ch8Word, createWord};