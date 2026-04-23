import {Memory} from "./memory.js";
import { Ch8Byte } from "./bytes.js";
import { Ch8Word } from "./words.js";
import { Screen } from "./screen.js";

function initVariableRegisters()
{
    const v = 
    {
        "1" : new Ch8Byte(0),
        "2" : new Ch8Byte(0),
        "3" : new Ch8Byte(0),
        "4" : new Ch8Byte(0),
        "5" : new Ch8Byte(0),
        "6" : new Ch8Byte(0),
        "7" : new Ch8Byte(0),
        "8" : new Ch8Byte(0),
        "9" : new Ch8Byte(0),
        "A" : new Ch8Byte(0),
        "B" : new Ch8Byte(0),
        "C" : new Ch8Byte(0),
        "D" : new Ch8Byte(0),
        "E" : new Ch8Byte(0),
        "F" : new Ch8Byte(0)
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
                console.log("here");
                return true;
            }
            return false;
    }
}

function isEqualParameterIns(instruction, word)
{
    const value = Instructions[instruction];
    console.log("instruction key is", instruction);
    console.log("value is", value);
    const nibbles = value.split("");
    console.log(nibbles, "split");
    for (let j = 0; j < 4; j++)
    {
        console.log("comparing nibbles", nibbles[j], word.getNibble(4-j));
        if (!compareNibbles(nibbles[j], word.getNibble(4-j)))
        {
            console.log(nibbles[j], "does ont match", word.getNibble(4-j));
            return false;
        }
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

function addRegister(instruction, varRegisters)
{
    throw new Error("NOT YET IMPLEMENTED!");
}

class Emulator
{
    constructor(rom)
    {
        this.memory = new Memory(rom);
        this.programCounter = new Ch8Word(0x200);
        this.index = new Ch8Word(0);
        this.vRegisters = initVariableRegisters();
        this.screen = new Screen();
        this.keepRunning = true;
    }

    //st
    setVarRegister()
    {

    }

    execute(instruction, opcode)
    {
        switch(instruction)
        {
            case "CLEAR":
                this.screen.clearScreen();
                break;
            case "ADD":
                this.vRegisters = addRegister(instruction, this.vRegisters);
                break;
            case "SETINDEX":
                this.index = new Ch8Word(opcode.getNNN());
                break;
            case "SET":
                const vx = getVX(opcode);
                throw new Error("NOT YET IMPLEMENTED!")
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
        console.log("analysing opcode", opcode);
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

    runCPUloop()
    {
        console.log("Doing calculation-things here...");
        console.log("the length of memory is: ", this.memory._memory.length);
        console.log(this.vRegisters.B);
        const [h,l] = this.programCounter.toBytes();
        console.log(h);
        console.log("nibble method",this.programCounter.getNibble(3));
        //this.screen.updatePixel(-1,1, "helooooooo")
        while(this.keepRunning)
        {
            const opcode = this.memory.readOpcode(this.programCounter); // read opcode
            const instruction = this.decode(opcode);                    // decode
            this.incrementPC();                                         // increment program counter
            this.execute(instruction, opcode);                                  // execute
        }
    }
}

export {Emulator};