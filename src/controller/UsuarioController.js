import UsuarioModel from "../model/UsuarioModel.js";


export default class UsuarioController {
    async criar (req, res) {
        
        let {nome, email, idade} = req.body;

        if (nome && email && idade) {
            let usuariomodel = new UsuarioModel("", nome, email, idade);
            let usuariocriar = await usuariomodel.criar();

            if (usuariocriar) {
                res.status(200).json({
                    ok:true,
                    msg: "Usuario criado com sucesso!"
                })
            } else {
                res.status(404).json({
                    succes: false,
                    message: "usuário não encontrado!"})
            }
        } else {
            res.status(400).json({
                succes: false,
                message: "Campos Inválidos"
            })
        }
    }
}