export class ClinicalFields {

    constructor(public fieldName: string,
                public name: string,
                public chartType: string,
                public visible: boolean = true,
                public multivalue: boolean = false,
                public filterHandler: any = null,
                public width: number = 340,
                public height: number = 200,
            ) {
    }
}
