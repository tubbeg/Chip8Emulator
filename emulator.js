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

class Emulator
{
    constructor(rom)
    {
        this.memory = new Memory(rom);
        this.programCounter = new Ch8Word(0x200);
        this.index = new Ch8Word(0);
        this.vRegisters = initVariableRegisters();
        this.screen = new Screen();
        self.keepRunning = true;
    }

    execute(instruction)
    {
        throw new Error("NOT YET IMPLEMENTED!")
    }


    decode(opcode)
    {
        throw new Error("NOT YET IMPLEMENTED!")
    }

    runCPUloop()
    {
        console.log("Doing calculation-things here...");
        console.log("the length of memory is: ", this.memory._memory.length);
        console.log(this.vRegisters.B);
        const [h,l] = this.programCounter.toBytes();
        console.log(h);
        console.log("nibble method",this.programCounter.getNibble(3));
        this.screen.updatePixel(-1,1, "helooooooo")
        while(this.keepRunning)
        {
            const opcode = this.memory.readOpcode(self.programCounter); // read opcode
            const instruction = this.decode(opcode);                    // decode
            this.execute(instruction);                                  // execute
        }
    }
}

export {Emulator};