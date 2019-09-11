export const HOMOZYGOTES_KEY = '1/1';
export const HETEROZYGOTES_KEY = '0/1';
const DB_SNP_URL = 'https://www.ncbi.nlm.nih.gov/projects/SNP/snp_ref.cgi';


export class Variant {
    c: string;
    s: number;
    rs: string;
    a: string;
    r: string;
    t: string;
    ac: number;
    af: number;
    homc: number;
    hetc: number;
    vac: string;
    vaf: number;
    vhomc: number;
    vhetc: number;
    vhomc1: number;
    vhetc1: number;
    vhomc2: number;
    vhetc2: number;
    vhomc3: number;
    vhetc3: number;
    geneSymbol: string;
    highlight = false;

    static dbSnpUrl(variant: Variant) {
        return `${DB_SNP_URL}?rs=${variant.rs}`;
    }

    static displayName(variant: Variant) {
        return `${ variant.c }-${ variant.s }-${ variant.r }-${ variant.a }`;
    }
}
