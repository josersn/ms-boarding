import app from "./infrastructure/serve";

async function main() {
    const application = app();

    application.then((server) => {
        server.listen({port: 3000}, (err, address) => {
            if(err) throw err

            console.log("Running")
        });
    });
}


main();