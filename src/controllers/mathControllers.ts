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


export { differentiate, integrate, calcRequestBody };