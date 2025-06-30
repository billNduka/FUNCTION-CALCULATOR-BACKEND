import { Request, Response } from 'express';
import { derivative } from 'mathjs';

interface difRequestBody{
    expression: string;
    variable?: string;
}

function differentiate(req: Request<{}, {}, difRequestBody>, res: Response): void {
    const expression = req.body.expression;
    const variable = req.body.variable || "x"; 

    try {
        const result = derivative(expression, variable).toString();
        res.json({ result });
    } catch (error) {
        res.status(400).json({ error: "Invalid expression" });
    }
}

export { differentiate };