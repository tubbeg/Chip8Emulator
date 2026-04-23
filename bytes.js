
function validByte(nr)
{
    if (nr < 0)
        return false;
    if (nr > 255)
        return false;
    return true;
}

class Ch8Byte
{
    constructor(nr)
    {
        if (!validByte(nr)) //constructors should never throw exceptions as a rule
            throw new Error("invalid number");
        this._nr = nr;
    }

    toNumber()
    {
        return this._nr;
    }

    addNumber(nr)
    {
        this._nr += nr;
        if (!validByte(this._nr))
            this._nr = this._nr % 0xFF;
    }

    //bit zero is LSB
    getBit(nth)
    {
        const maskBit = this._nr & (1 << nth)
        return maskBit > 0;
    }
}


export {Ch8Byte};