import { isUndefined } from 'util';

export const COMMAND_TOKEN = '/';
const SLASH_INDEX = 1;
const COMMAND_INDEX = 2;
const OP_INDEX = 3;
const VALUE_INDEX = 4;

export type FilterOperator = '<' | '>' | '=' | '!=';

export class FilterSharedService {

    readonly operators: FilterOperator[] = ['<', '>', '=', '!='];

    private parseCommand(command: string, ts): RegExpMatchArray {
        if (!this.isCommand(command)) {
            return [];
        }
        return command.match(this.regex(ts));
    }

    private regex(ts): RegExp {
        const s = `(\/)(?:.*(${ this.keys(ts).join('|') })(?:.*?((?:!=)|[<>=])([^!<>=\n]*))*)*`;
        return new RegExp(s, 'i');
    }

    private isNumeric(n: any) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    keys(ts) {
        return Object.keys(ts.sortMap);
    }

    isValidCommand(s: string, ts): boolean {
        const r = this.parseCommand(s, ts);
        return r !== null && r.length === 5 && r[COMMAND_INDEX] !== '' && r[OP_INDEX] !== '';
    }

    nextTokens(s: string, searchApi, ts): Promise<string[]> {
        const m = s.match(this.regex(ts));
        if (!m) {
            return Promise.resolve([]);
        }
        const slash = m[SLASH_INDEX];
        const command = m[COMMAND_INDEX];
        const op = m[OP_INDEX];
        if (slash && command && op) {
            return Promise.resolve([]);
        } else if (slash && command) {
            const lo = m.input.substr(m.input.indexOf(command) + command.length, m.input.length);
            if (lo) {
                return searchApi.search(lo);
            } else {
                return Promise.resolve(this.operators);
            }
        } else if (slash) {
            const lo = m.input.substr(1);
            if (lo) {
                return searchApi.search(lo);
            } else {
                return Promise.resolve(this.keys(ts).sort());
            }
        }
    }

    isCommand(s: string) {
        return s.indexOf(COMMAND_TOKEN) !== -1;
    }

    filterVariants(command: string, variants: any[], ts) {
        if (!this.isValidCommand(command, ts)) {
            return variants;
        }
        const args = this.parseCommand(command, ts);
        return this.filter(args[COMMAND_INDEX], <FilterOperator>args[OP_INDEX], args[VALUE_INDEX], variants, ts);
    }

    filter(command: string, op: FilterOperator, value: string | number, variants: any[], ts) {
        if (!command) {
            return variants;
        }

        value = this.isNumeric(value) ? Number(value) : value;

        return variants.filter(v => {
            let a = ts.sortMap[command](v);
            if (a === null || isUndefined(a)) {
                a = '';
            }
            switch (op) {
                case '<':
                    return a < value;
                case '>':
                    return a > value;
                case '=':
/* tslint:disable */
                    return a == value;
                case '!=':
                    return a != value;
/* tslint:enable */
                default:
                    return true;
            }
        });
    }

    clean(s: string, ts): string {
        const match = s.match(this.regex(ts));
        return match.slice(1, 4).join('');
    }
}
