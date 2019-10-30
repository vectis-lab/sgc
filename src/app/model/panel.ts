export class Panel {
    constructor(public name: string,
                public genesCount: number) {};
}

export class GenesList {
    constructor(public genesData: any,
                public error: string) {};
}

export class PanelsList {
    constructor(public listPanels: Panel[],
                public error: string
    ){}
}