import request from "supertest";
import app from '../src/server';

describe("POST /api/math/differentiate", () => {
    it("should return the algebraic derivative", async () => {
        const res = await request(app)
                            .post("/api/math/differentiate")
                            .send({expression: "x^4+x^3+x^2+x", variable: "x"})
                            .set("Content-Type", "application/json");
        expect(res.statusCode).toBe(200);
        expect(res.body.result).toBe("4 * x ^ 3 + 3 * x ^ 2 + 2 * x + 1");
    }, 15000)
    it("should return the exponential derivative", async () => {
        const res = await request(app)
                            .post("/api/math/differentiate")
                            .send({expression: "e^(3x)", variable: "x"})
                            .set("Content-Type", "application/json");
        expect(res.statusCode).toBe(200);
        expect(res.body.result).toBe("3 * e ^ (3 x)");
    })
})

describe("POST api/math/integrate", () => {
    it("should return the algebraic integral", async () => {
        const res = await request(app)
                            .post("/api/math/integrate")
                            .send({expression: "x^4+x^3+x^2+x", variable: "x"})
                            .set("Content-Type", "application/json");
        expect(res.statusCode).toBe(200);
        expect(res.body.result).toBe("\\frac{1}{5}\\cdot{ x}^{5}+\\frac{1}{4}\\cdot{ x}^{4}+\\frac{1}{3}\\cdot{ x}^{3}+\\frac{1}{2}\\cdot{ x}^{2}");
        
    })
    it("should return the exponential integral", async () => {
        const res = await request(app)
                            .post("/api/math/integrate")
                            .send({expression: "e^(3x)", variable: "x"})
                            .set("Content-Type", "application/json");
        expect(res.statusCode).toBe(200);
        expect(res.body.result).toBe("\\frac{1}{3}\\cdot\\exp\\left(3\\cdot x\\right)");
        
    })

})