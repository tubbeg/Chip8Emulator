
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
}


export {Ch8Byte};