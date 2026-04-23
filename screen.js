

function generateKey(coordinate)
{
    return "x" + coordinate.x + ";y" + coordinate.y;
}

function setElement(el)
{
    el.innerText = " ";
    el.className = "button is-small  is-primary"
}


function resetElement(el)
{
    el.innerText = " ";
    el.className = "button is-small has-background-dark"
}



function createPixel(coordinate)
{
    const td = document.createElement("td");
    td.id = generateKey(coordinate);
    setElement(td);
    return td;
}

function createPixelRow(pixelsPerRow, y)
{
    const m = {};
    const tr = document.createElement("tr");
    for (let i = 0; i < pixelsPerRow; i++)
    {
        let coord = {x:i, y:y};
        let p = createPixel(coord);
        m[generateKey(coord)] = p;
        tr.appendChild(p);
    }
    return [tr, m];
}

function createHTMLscreen()
{
    //the screen is represented with an old-fashioned HTML table
    const t = document.createElement("table");
    const tbody = document.createElement("tbody");
    t.appendChild(tbody);
    t.className = "table";
    const [x,y] = [64,32];
    const tm = {};
    for (let i = 0; i < y; i++)
    {
        let [tr, mp] = createPixelRow(64, i)
        tbody.appendChild(tr);
        Object.assign(tm, mp);
    }
    return [t, tm];
}

function createScreen(screen)
{
    const [table, tm] = createHTMLscreen();
    screen.appendChild(table);
    return tm;
}

function addData(pixelMap)
{
    const newMap = {};
    Object.keys(pixelMap).forEach((k) =>
    {
        newMap[k] = {state:true, element:pixelMap[k]};
    });
    return newMap;
}

class Screen
{
    constructor()
    {
        this.t = document.getElementById("screen");
        this.pixelMap = addData(createScreen(this.t));
    }

    getPixel(x,y)
    {
        return this.pixelMap[generateKey({x:x,y:y})];
    }

    setPixel(x,y)
    {
        const px = this.getPixel(x,y);
        px.state = true;
        setElement(px.element);
    }

    resetPixel(x,y)
    {
        const px = this.getPixel(x,y);
        px.state = false;
        resetElement(px.element);
    }

    xorPixel(x,y, bit)
    {
        let carryFlag = false;
        const px = this.getPixel(x,y);
        console.log("setting pixel, ", px);
        if (px.state && !bit)
            carryFlag = true;
        const resultingState = px.state ^ bit;
        if (resultingState)
            this.setPixel(x,y);
        else
        {
            this.resetPixel(x,y);
        }
        return carryFlag;
    }


    drawByte(x,y,byte)
    {
        console.log("drawing byte");
        let carryFlag = false;
        let byteIndex = 7; //drawing starts from the MSB, i.e. left to right
        for (let i = x; i < x + 8; i++)
        {
            let bit = byte.getBit(byteIndex);
            console.log("drawing pixel", i, bit);
            if (this.xorPixel(i,y,bit))
                carryFlag = true;
            byteIndex -= 1;
        }
        return carryFlag;
    }

    drawBytes(x,y,bytes)
    {
        console.log("commencing artistry");
        let bI = 0;
        let carryFlag = false;
        for (let j = y; j < y + bytes.length; j++)
        {
            console.log("drawing byte", bytes[bI]);
            if (this.drawByte(x,j, bytes[bI]))
                carryFlag = true;
            bI += 1;
        }
        return carryFlag;
    }

    _clear(pixelKey)
    {
        const pixel = this.pixelMap[pixelKey];
        pixel.state = false;
        resetElement(pixel.element);
    }

    clearScreen()
    {
        Object.keys(this.pixelMap).forEach((k) => {this._clear(k)});
    }
}





export {Screen};