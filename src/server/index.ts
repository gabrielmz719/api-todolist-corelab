import { server } from "./server";

let port: number = 3000;


server.listen(port, () => {
    console.log(`Projeto rodando localhost ${port}`)
});
