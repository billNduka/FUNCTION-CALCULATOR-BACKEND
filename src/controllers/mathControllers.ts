import { Request, Response } from 'express';
import { derivative, parse, MathNode, simplify } from 'mathjs';
import algebriteExports, * as Algebrite from 'algebrite';

interface calcRequestBody{
    expression: string;
    variable?: string;
    order?: number
}
interface rootsRequestBody{
    expression: string;
}

///api/math/differentiate
function differentiate(req: Request<{}, {}, calcRequestBody>, res: Response): void {
    const expression = req.body.expression;
    const variable = req.body.variable || "x"; 
    const order = req.body.order || 1;
    let partialResult = expression;
    let result: string;

    try {
        let node: MathNode = parse(expression);
        for (let i = 0; i < order; i++) {
            node = derivative(node, variable) as MathNode;
            if (node.toString() === "0") break;
        }

        const simplified = simplify(node);
        res.json({ result: simplified.toString() });
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
function convertBase(req: Request<{frombase: string, tobase: string}, {}, { expression: string }>, res: Response): void{
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

///api/math/expand
function expand(req: Request<{}, {}, { expression: string }>, res: Response): void {
    try {
        const input = req.body.expression;
        const result = algebriteExports.expand(input).toString();
        if (result === input) {
            throw new Error("Invalid expression");
        }
        res.json({ result });
    } catch (error) {
        res.status(400).json({ error: "Invalid expression" });
    }
}


///api/math/roots
function findRoots(req: Request<{}, {}, rootsRequestBody>, res: Response): void{
    const expression = req.body.expression

    try {
        const result = algebriteExports.roots(expression).toString();
        res.json({ result });
    } catch (error) {
        res.status(400).json({ error: "Invalid polynomial" });
    }
}

export { differentiate, integrate, calcRequestBody, convertBase, expand, findRoots };
