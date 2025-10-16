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
    it("should compute the second derivative of x^3", async () => {
    const res = await request(app)
      .post("/api/math/differentiate")
      .send({ expression: "x^3", variable: "x", order: 2 });

    expect(res.statusCode).toBe(200);
    expect(res.body.result).toBe("6 * x");
  });
  it("should compute the third derivative of x^3", async () => {
    const res = await request(app)
      .post("/api/math/differentiate")
      .send({ expression: "x^3", variable: "x", order: 3 });

    expect(res.statusCode).toBe(200);
    expect(res.body.result).toBe("6");
  });
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
            .send({ expression: "1011" })
            .set("Content-Type", "application/json");
        expect(res.statusCode).toBe(200);
        expect(res.body.result).toBe("11");
    });

    it("should convert decimal to hexadecimal", async () => {
        const res = await request(app)
            .post("/api/math/convert/10-16")
            .send({ expression: "255" })
            .set("Content-Type", "application/json");
        expect(res.statusCode).toBe(200);
        expect(res.body.result).toBe("ff");
    });

    it("should convert hexadecimal to binary", async () => {
        const res = await request(app)
            .post("/api/math/convert/16-2")
            .send({ expression: "1a" })
            .set("Content-Type", "application/json");
        expect(res.statusCode).toBe(200);
        expect(res.body.result).toBe("11010");
    });

    it("should return 400 for invalid radix", async () => {
        const res = await request(app)
            .post("/api/math/convert/1-10")
            .send({ expression: "123" })
            .set("Content-Type", "application/json");
        expect(res.statusCode).toBe(400);
        expect(res.body.error).toBe("Invalid conversion");
    });

    it("should return 400 for invalid expression", async () => {
        const res = await request(app)
            .post("/api/math/convert/2-10")
            .send({ expression: "notbinary" })
            .set("Content-Type", "application/json");
        expect(res.statusCode).toBe(400);
        expect(res.body.error).toBe("Invalid conversion");
    });
});

describe("POST /api/math/expand", () => {
    it("should expand a binomial expression", async () => {
        const res = await request(app)
            .post("/api/math/expand")
            .send({ expression: "(2x-1)^3" })
            .set("Content-Type", "application/json");
        expect(res.statusCode).toBe(200);
        expect(res.body.result.replace(/\s/g, '')).toBe("8*x^3-12*x^2+6*x-1");
    });

    it("should expand a product expression", async () => {
        const res = await request(app)
            .post("/api/math/expand")
            .send({ expression: "(2x+1)*(x+1)^2" })
            .set("Content-Type", "application/json");
        expect(res.statusCode).toBe(200);
        expect(res.body.result.replace(/\s/g, '')).toBe("2*x^3+5*x^2+4*x+1");
    });

    it("should return 400 for invalid expression", async () => {
        const res = await request(app)
            .post("/api/math/expand")
            .send({ expression: "notmath" })
            .set("Content-Type", "application/json");
        expect(res.statusCode).toBe(400);
        expect(res.body.error).toBe("Invalid expression");
    });
});

describe("POST /api/math/roots", () => {
    it("should find the roots of a linear equation", async () => {
        const res = await request(app)
            .post("/api/math/roots")
            .send({ expression: "2*x - 4" })
            .set("Content-Type", "application/json");
        expect(res.statusCode).toBe(200);
        expect(res.body.result).toEqual("2");
    })
    it("should find the roots of a quadratic equation", async () => {
        const res = await request(app)
            .post("/api/math/roots")
            .send({ expression: "x^2 - 5*x + 6" })
            .set("Content-Type", "application/json");
        expect(res.statusCode).toBe(200);
        expect(res.body.result).toEqual("[2,3]");
    })
    it("should find the roots of a cubic equation", async () => {
        const res = await request(app)
            .post("/api/math/roots")
            .send({ expression: "x^3 - 6*x^2 + 11*x - 6" })
            .set("Content-Type", "application/json");
        expect(res.statusCode).toBe(200);
        expect(res.body.result).toEqual("[1,2,3]");
    })
    it("should find the roots of a quartic equation", async () => {
        const res = await request(app)
            .post("/api/math/roots")
            .send({ expression: "x^4 - 10*x^3 + 35*x^2 - 50*x + 24" })
            .set("Content-Type", "application/json");
        expect(res.statusCode).toBe(200);
        expect(res.body.result).toEqual("[1,2,3,4]");
    })
    it("should return 400 for invalid expression", async () => {
        const res = await request(app)
            .post("/api/math/roots")
            .send({ expression: "notmath" })
            .set("Content-Type", "application/json");
        expect(res.statusCode).toBe(400);
        expect(res.body.error).toBe("Invalid polynomial");
    })
})
describe("POST /api/math/convert-unit", () => {
    it("should convert meters to kilometers", async () => {
        const res = await request(app)
            .post("/api/math/convert-unit")
            .send({ value: "1500", fromUnit: "m", toUnit: "km" })
            .set("Content-Type", "application/json");
        expect(res.statusCode).toBe(200);
        expect(res.body.result.toString()).toBe("1.5 km");
    })
    it("should convert grams to kilograms", async () => {
        const res = await request(app)
            .post("/api/math/convert-unit")
            .send({ value: "5000", fromUnit: "g", toUnit: "kg" })
            .set("Content-Type", "application/json");
        expect(res.statusCode).toBe(200);
        expect(res.body.result.toString()).toBe("5 kg");
    })
    it("should return 400 for invalid conversion", async () => {
        const res = await request(app)
            .post("/api/math/convert-unit")
            .send({ value: "100", fromUnit: "m", toUnit: "kg" })
            .set("Content-Type", "application/json");
        expect(res.statusCode).toBe(400);
        expect(res.body.error).toBe("Invalid conversion");
    })  
})