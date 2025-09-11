import { Request, Response } from 'express';
import { derivative, parse } from 'mathjs';
import algebriteExports, * as Algebrite from 'algebrite';

interface calcRequestBody{
    expression: string;
    variable?: string;
}

///api/math/differentiate
function differentiate(req: Request<{}, {}, calcRequestBody>, res: Response): void {
    const expression = req.body.expression;
    const variable = req.body.variable || "x"; 

    try {
        const result = derivative(expression, variable).toString();
        res.json({ result });
    } catch (error) {
        res.status(400).json({ error: "Invalid expression" });
    }
}

///api/math/integrate
function integrate(req: Request<{}, {}, calcRequestBody>, res: Response): void{
    const expression = req.body.expression;
    const variable = req.body.variable || "x";

    try{
        const result_parsed = parse(algebriteExports.integral(expression, variable).toString());
        const result = result_parsed.toTex();
        res.json({ result });
    }catch (error){
        res.status(400).json({ error: "Invalid expression" });
    }

}

///api/math/convert/:frombase-:tobase
function convertBase(req: Request<{frombase: string, tobase: string}, {}, { value: string }>, res: Response): void{
    const fromBase = parseInt(req.params.frombase);
    const toBase = parseInt(req.params.tobase);
    const value = req.body.expression;
    let result:string|number;

    try{
        if(fromBase > 32 || fromBase < 2 || toBase > 32 || toBase < 2){
            throw new Error("invalid radix");
        }
        if (isNaN(parseInt(value))) { 
            throw new Error("invalid value");
        }
        if (fromBase == 10){
            result = parseInt(value).toString(toBase);
            res.json({ result });
        } else{
            result = parseInt(value, fromBase);
            if (toBase == 10) {
                res.json({ result: result.toString() });
            } else {
                res.json({ result: result.toString(toBase) });
            }
        }
        
    } catch(error){
        res.status(400).json({ error: "Invalid conversion" });
    }
}

export { differentiate, integrate, calcRequestBody, convertBase };
