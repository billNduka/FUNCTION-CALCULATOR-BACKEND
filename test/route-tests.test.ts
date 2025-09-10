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

describe("POST /api/math/convert/:frombase-:tobase", () => {
    it("should convert binary to decimal", async () => {
        const res = await request(app)
            .post("/api/math/convert/2-10")
            .send({ value: "1011" })
            .set("Content-Type", "application/json");
        expect(res.statusCode).toBe(200);
        expect(res.body.result).toBe("11");
    });

    it("should convert decimal to hexadecimal", async () => {
        const res = await request(app)
            .post("/api/math/convert/10-16")
            .send({ value: "255" })
            .set("Content-Type", "application/json");
        expect(res.statusCode).toBe(200);
        expect(res.body.result).toBe("ff");
    });

    it("should convert hexadecimal to binary", async () => {
        const res = await request(app)
            .post("/api/math/convert/16-2")
            .send({ value: "1a" })
            .set("Content-Type", "application/json");
        expect(res.statusCode).toBe(200);
        expect(res.body.result).toBe("11010");
    });

    it("should return 400 for invalid radix", async () => {
        const res = await request(app)
            .post("/api/math/convert/1-10")
            .send({ value: "123" })
            .set("Content-Type", "application/json");
        expect(res.statusCode).toBe(400);
        expect(res.body.error).toBe("Invalid conversion");
    });

    it("should return 400 for invalid value", async () => {
        const res = await request(app)
            .post("/api/math/convert/2-10")
            .send({ value: "notbinary" })
            .set("Content-Type", "application/json");
        expect(res.statusCode).toBe(400);
        expect(res.body.error).toBe("Invalid conversion");
    });
});