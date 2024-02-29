// veiculoController.js
const VeiculoModel = require('../../models/veiculoModel/veiculoModel');


//rota para adicionar usuario
const adicionaVeiculo = (req, res) => {

    const { nomeVeiculo, placa, renavam } = req.body

    VeiculoModel.adicionaVeiculo(nomeVeiculo, placa, renavam, (err, resultado) => {
        if (err) {
            console.error('Erro ao salvar o veiculo:', err);
            return res.status(500).json({ error: 'Veiculo ja cadastrado' });
        } else {
            console.log('Veiculo cadastrado com sucesso')
            res.status(201).json({ result: 'Veiculo salvo com sucesso', resultado });
        }
    });
};

const atualizarVeiculo = (req, res) => {
    const { idveiculos, nomeVeiculo, placa, renavam } = req.body;

    VeiculoModel.atualizarVeiculo(idveiculos, nomeVeiculo, placa, renavam, (err, resultado) => {
        if (err) {
            console.error('Erro ao atualizar o veiculo:', err);
            return res.status(500).json({ error: 'Erro ao atualizar o veiculo' });
        }
        console.log('Veiculo atualizado com sucesso')
        res.status(200).json({ message: 'Veiculo atualizado com sucesso', resultado });
    })
};

const excluirVeiculo = (req, res) => {
    const { id } = req.params;

    VeiculoModel.excluirVeiculo(id, (err, resultado) => {
        if (err) {
            console.error('Erro ao excluir o veiculo:', err);
            return res.status(500).json({ error: 'Erro ao excluir o veiculo' });
        }
        console.log('Veiculo excluido com sucesso')
        res.status(200).json({ message: 'Veiculo excluído com sucesso', resultado });
    });
};

const listarVeiculos = (req, res) => {
    VeiculoModel.listarVeiculos((err, resultado) => {
        if (err) {
            console.error('Erro ao listar os veiculos:', err);
            return res.status(500).json({ error: 'Erro ao listar os veiculos' });
        }
        res.status(200).json(resultado);
    });
};

const buscarVeiculoPorId = (req, res) => {
    const { id } = req.params;
    VeiculoModel.buscarVeiculoPorId(id, (err, resultado) => {
        if (err) {
            console.error('Erro ao listar os veiculos:', err);
            return res.status(500).json({ error: 'Erro ao listar os veiculos' });
        }
        res.status(200).json({ message: 'Veiculo encontrado', resultado });

    });
};


module.exports = { adicionaVeiculo, atualizarVeiculo, excluirVeiculo, listarVeiculos, buscarVeiculoPorId };



