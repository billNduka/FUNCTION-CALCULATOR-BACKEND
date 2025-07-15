// src/types/algebrite.d.ts

declare module 'algebrite' {
    interface AlgebriteResult {
        toString(): string;
    }

    const algebriteExports: {
        integral(expression: string, variable: string): AlgebriteResult;
        eval(expression: string): AlgebriteResult;
        simplify(expression: string): AlgebriteResult;
        [key: string]: (...args: any[]) => AlgebriteResult | any;
    };

    export default algebriteExports;
}