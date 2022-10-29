import { variant, field } from '@dao-xyz/borsh'
import { Program } from '@dao-xyz/peerbit-program';

@variant(0)
export abstract class Content {

}

@variant(0)
export class ProgramContent extends Content {

    @field({ type: Program })
    program: Program;

    constructor(properties?: { program: Program }) {
        super();
        if (properties) {
            this.program = properties.program;
        }
    }

    getProgram<T>(): T {
        return this.program as T
    }
}


@variant(1)
export abstract class StaticContent extends Content {


}