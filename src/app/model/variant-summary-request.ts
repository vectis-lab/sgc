import { VariantSummary } from './variant-summary';

export class VariantSummaryRequest {
    constructor(public variants: VariantSummary[], public error: string = '', public total: number = null) {}
}