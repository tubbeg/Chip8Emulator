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
        JMP : "JMP",
        DRAW : "DRAW",
        SETINDEX : "SETINDEX",
        ADD : "ADD",
        SET : "SET",
        CLEAR : "CLEAR"
    }
);


function firstNibbleIsOne(word)
{
    return word.getFirstNibble() == 0x1;
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

    execute(instruction)
    {
        switch(instruction)
        {
            case Instructions.ADD:
                this.vRegisters = addRegister(instruction, this.vRegisters);
                break;
            default:
                throw new Error("NOT YET IMPLEMENTED!");
                break;
        }
    }

    decode(opcode)
    {
        if (firstNibbleIsOne(opcode))
            return Instructions.JMP;
        return null;
    }

    incrementPC()
    {
        //2 bytes per instruction means that
        //we have to increment twice 
        this.programCounter.addNumber(2);
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
            console.log("here");
            const opcode = this.memory.readOpcode(this.programCounter); // read opcode
            const instruction = this.decode(opcode);                    // decode
            this.incrementPC();                                         // increment program counter
            this.execute(instruction);                                  // execute
        }
    }
}

export {Emulator};