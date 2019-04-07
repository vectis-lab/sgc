export class Chart {

    constructor(public name: string,
                public type: string,
                public dim: any,
                public width: number,
                public height: number,
                public enabled = false,
                public group: any,
                public initFilter: any[] = null,
                public filterHandler:any = null,
                public xAxisLabel: string = "",
                public yAxisLabel: string = "",
            ) {
    }
}