import { ITokenization } from "../../interfaces";
import { JsonWebTokenProvider } from "./json-web-token";

let lut: ITokenization;

describe("Json Web Token Library", () => {

    beforeEach(() => {
        lut = new JsonWebTokenProvider("MOCK_SECRET", 360);
    })

    it("Should return a string with encrypted value", async () => {
        const token = await lut.sign({ id: 1 });
        expect(token).toBeTruthy();
    })

    it("Should return value provider", async () => {
        const token = await lut.sign({ id: 1 });

        const result = await lut.verify(token);

        expect(result).toHaveProperty("id");
        expect(result.id).toBe(1);

    })

    it("Should return false with invalid token", async () => {

        const result = await lut.verify("MOCK_DATA");

        expect(result).toBeFalsy();
    })
})


