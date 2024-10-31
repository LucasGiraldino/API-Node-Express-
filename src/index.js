import express from 'express';

const app = express();

app.use(express.json());

let usuarios = [
    {id : 1, nome : 'Joao', email : "joao@email.com", idade : 25},
    {id : 2, nome : 'Lucas', email : "lucas@email.com", idade : 18},
    {id : 3, nome : 'Maria', email : "maria@email.com", idade : 30},
    {id : 4, nome : 'Layla', email : "layla@email.com", idade : 16},

];

app.get("/", (req, res) => {
    res.send('Hello Fipp 2');
})

app.get ("/usuarios/:id", (req, res) => {
    const id = req.params.id;
    if (!id) {
        res.status (400).json({succes: false, message: "Manda o ID"});
    } else {
        const usuarioEncontrado = usuarios.find((usuario) => 
            usuario.id === Number(id)
        );
        if (usuarioEncontrado != undefined) {
            res.status(200).json({
                succes: true, 
                data: usuarioEncontrado
            });
        } else {
            res.status(404).json({
                succes: false,
                data: "Usuário não encontrado"
            });
        }

    }
})

app.post ("/usuarios", (req, res) => {
    const {nome, email, idade} = req.body;

    if (!nome || !email || !idade) {
        res.status (400).json ({
            succes: false,
            message: "Informações inválidas"
        });
    } else {
        const novoUsuario = {
            id: usuarios[usuarios.length - 1].id + 1,
            nome, 
            email,
            idade,
        }
        usuarios.push(novoUsuario);

        res.status(200).json({succes: true, message: "Usuariso criados com sucesso!"});
    }
})


app.get ("/usuarios", (req, res) => {
    res.status (200).json({succes: true, data: usuarios})
})



app.listen(5000, () => {
    console.log ('Servidor rodado em http://localhost:5000');
})