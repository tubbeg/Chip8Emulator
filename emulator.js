import {Memory} from "./memory.js";
import { Ch8Byte } from "./bytes.js";
import { Ch8Word } from "./words.js";
import { Screen } from "./screen.js";

function initVariableRegisters()
{
    const v = 
    {
        "0" : new Ch8Byte(0),
        "1" : new Ch8Byte(0),
        "2" : new Ch8Byte(0),
        "3" : new Ch8Byte(0),
        "4" : new Ch8Byte(0),
        "5" : new Ch8Byte(0),
        "6" : new Ch8Byte(0),
        "7" : new Ch8Byte(0),
        "8" : new Ch8Byte(0),
        "9" : new Ch8Byte(0),
        "a" : new Ch8Byte(0),
        "b" : new Ch8Byte(0),
        "c" : new Ch8Byte(0),
        "d" : new Ch8Byte(0),
        "e" : new Ch8Byte(0),
        "f" : new Ch8Byte(0)
    };
    return v;
}



const Instructions = Object.freeze
(
    {
        JMP : "1NNN",
        DRAW : "DXYN",
        SETINDEX : "ANNN",
        ADD : "7XNN",
        SET : "6XNN",
        CLEAR : "00E0"
    }
);

function compareNibbles(character, number_nibble)
{
    const padding = "0x";
    switch(character)
    {
        case 'N':
            return true;
        case 'X':
            return true;
        case 'Y':
            return true;
        default:
            if (Number(padding + character) == number_nibble)
            {
                return true;
            }
            return false;
    }
}

function isEqualParameterIns(instruction, word)
{
    const value = Instructions[instruction];
    const nibbles = value.split("");
    for (let j = 0; j < 4; j++)
    {
        if (!compareNibbles(nibbles[j], word.getNibble(4-j)))
            return false;
    }
    return true;
}

function getInstruction(w)
{
    let ins = null;
    Object.keys(Instructions).forEach(i => {if (isEqualParameterIns(i,w)) {ins=i;}});
    return ins;
}


function isClear(word)
{
    return word.equals(0x00E0);
}

function isAdd(word)
{
    return word.getFourthNibble() == 0x7;
}

function isSet(word)
{
    return word.getFourthNibble() == 0x6;
}


//Most Significant Nibble, big endian
function isJump(word)
{
    return word.getFourthNibble() == 0x1;
}

function getVX(opcode)
{
    return opcode.getThirdNibble();
}

function getVY(opcode)
{
    return opcode.getSecondNibble();
}


class Emulator
{
    constructor(rom)
    {
        this.programCounter = new Ch8Word(0x200);
        this.index = new Ch8Word(0);
        this.vRegisters = initVariableRegisters();
        this.screen = new Screen();
        this.keepRunning = false;
        this.memory = null;
        this.dbg = document.getElementById("debugElement");
        this.dbg.innerText = "hello" + this.programCounter.toNumber().toString();
    }

    init(rom)
    {
        this.keepRunning = true;
        this.memory = new Memory(rom);
    }

    setVarRegister(opcode)
    {
        const vr = getVX(opcode);
        const value = opcode.getNN();
        const vrs = vr.toString(16);
        const vreg = this.vRegisters[vrs];
        if (!vreg)
        {
            console.error(vreg, vrs);
            throw new Error("not existign register");
        }
        this.vRegisters[vrs] = new Ch8Byte(value);
    }

    addRegister(opcode)
    {
        const vr = getVX(opcode);
        const value = opcode.getNN();
        const vrs = vr.toString(16);
        const vreg = this.vRegisters[vrs];
        if (!vreg)
        {
            console.error(vreg, vrs);
            throw new Error("not existign register");
        }
        vreg.addNumber(value);
    }

    setCarryFlag()
    {
        this.vRegisters["f"] = new Ch8Byte(1);
    }

    resetCarryFlag()
    {
        this.vRegisters["f"] = new Ch8Byte(0);
    }


    draw(opcode)
    {
        const vXs = getVX(opcode).toString(16);
        const vYs = getVY(opcode).toString(16);
        const vRegX = this.vRegisters[vXs];
        const vRegY = this.vRegisters[vYs];
        const nrOfBytes = opcode.getFirstNibble();
        const bytes = this.memory.readIndexBytes(this.index, nrOfBytes);
        const [x,y] = [vRegX.toNumber(), vRegY.toNumber()];
        if (this.screen.drawBytes(x,y,bytes))
            this.resetCarryFlag();
    }

    execute(instruction, opcode)
    {
        console.log("executing...", instruction);
        switch(instruction)
        {
            case "CLEAR":
                this.screen.clearScreen();
                break;
            case "ADD":
                this.addRegister(opcode);
                break;
            case "SETINDEX":
                this.index = new Ch8Word(opcode.getNNN());
                break;
            case "SET":
                this.setVarRegister(opcode);
                break;
            case "DRAW":
                this.draw(opcode);
                break;
            case "JMP":
                const nnn = opcode.getNNN();
                this.programCounter = new Ch8Word(nnn);
                break;
            default:
                console.log(instruction, "instruction is");
                console.log(Instructions.CLEAR.toString(), );
                throw new Error("NOT YET IMPLEMENTED!");
                break;
        }
    }

    decode(opcode)
    {
        /*sif (isJump(opcode))
            return Instructions.JMP;
        if (isClear(opcode))
            return Instructions.CLEAR;
        if (isAdd(opcode))
            return Instructions.ADD;
        if (isSet(opcode))
            return Instructions.ADD;*/
        return getInstruction(opcode);
    }

    incrementPC()
    {
        //2 bytes per instruction means that
        //we have to increment twice 
        this.programCounter.increment();
        this.programCounter.increment();
        if (this.programCounter.toNumber() > 0xFFF) // out of memory
            this.programCounter = new Ch8Word(0);
    }

    async runCPUloop()
    {
        const [h,l] = this.programCounter.toBytes();
        while(this.keepRunning)
        {
            this.dbg.innerText = "hello" + this.programCounter.toNumber().toString();
            await new Promise(r => setTimeout(r, 200));
            const opcode = this.memory.readOpcode(this.programCounter); // read opcode
            const instruction = this.decode(opcode);                    // decode
            this.incrementPC();                                         // increment program counter
            this.execute(instruction, opcode);                          // execute
        }
    }
}

export {Emulator};