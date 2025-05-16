import fs from "fs";


interface JupiterVerifiedToken {
    address: string;
    name: string;
    symbol: string;
    decimals: number;
    logoURI: string;
    tags: string[];
    daily_volume: number;
    created_at: string;
    freeze_authority: unknown;
    mint_authority: unknown;
    permanent_delegate: unknown;
    minted_at: unknown;
    extensions: unknown;
}

const jupiterVerified = "./jupiter-verified-tokens.json" as const;

const jupiterVerifiedTokens = async () => {
    const response = await fetch("https://lite-api.jup.ag/tokens/v1/tagged/verified", {
        method: "GET",
    });
    const data = (await response.json() as JupiterVerifiedToken[])
        .map(({ symbol, address, name, decimals, logoURI }) => ({
            symbol, address, name, decimals,
            chainId: 7565164,
            image: logoURI,
        }));

    // write data to file
    fs.writeFile(jupiterVerified, JSON.stringify(data, null, 2), (err) => {
        if (err) {
            console.error("Error writing file:", err);
        } else {
            console.log("File written successfully");
        }
    });
};

(function main() {
    try {
        jupiterVerifiedTokens()
    } catch (error) {
        console.error(error);
    }
})()
