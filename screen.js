

function generateKey(coordinate)
{
    return "x" + coordinate.x + ";y" + coordinate.y;
}

function createPixel(coordinate)
{
    const td = document.createElement("td");
    td.id = generateKey(coordinate);
    td.innerText = "X";
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

class Screen
{
    constructor()
    {
        this.t = document.getElementById("screen");
        this.pixelMap = createScreen(this.t);
    }

    updatePixel(x,y, text)
    {
        try
        {
            const px = this.pixelMap[generateKey({x:x,y:y})];
            px.innerText = text;
        }
        catch(error)
        {
            console.error("Coordinate at: ", x, y);
            throw error;
        }
    }

    _clear(pixelKey)
    {
        const pixel = this.pixelMap[pixelKey];
        pixel.innerText = "O";
    }

    clearScreen()
    {
        Object.keys(this.pixelMap).forEach((k) => {this._clear(k)});
    }
}





export {Screen};