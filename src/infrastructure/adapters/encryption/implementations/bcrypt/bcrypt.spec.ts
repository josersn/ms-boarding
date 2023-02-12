import { IEncryption } from "../../interface";
import { BcryptProvider } from "./bcrypt";

let lut: IEncryption

describe("Bcrypt Library", () => {

    beforeEach(() => {
        lut = new BcryptProvider();
     });

    it("Should a encrypt value", async() => {
        expect(await lut.crypt("mock")).toBeTruthy();
    });

    it("Should return true on decrypt date", async() => {
        const encrypted = await lut.crypt("mock");
        expect(await lut.decrypt("mock", encrypted)).toBeTruthy();
    });
    
    it("Should not return true on decrypt date", async() => {
        const encrypted = await lut.crypt("mock");
        expect(await lut.decrypt("mock_false", encrypted)).toBeFalsy();
    });
})