const API_URL = 'http://localhost:3000/api';


const api = {

    //ROTAS PARA ADICONAR Funcionario
    async adicionaFuncionario(formState) {

        const resposta = await fetch(`${API_URL}/adicionaFuncionario`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formState),
        });

        if (!resposta.ok) {
            throw new Error('Erro ao adicionar o Funcionario');
        }
    },

    async listarFuncionarios() {
        try {
            const resposta = await fetch(`${API_URL}/listarFuncionarios`);
            if (!resposta.ok) {
                const erroTexto = await resposta.text();
                throw new Error(`Erro ao carregar os Funcionarios: ${erroTexto}`);
            }
            return resposta.json();
        } catch (error) {
            console.error('Erro durante a chamada à API:', error.message);
            throw error;
        }
    },

    async buscarFuncionarioPorId(id) {
        const resposta = await fetch(`${API_URL}/listarFuncionarios/${id}`);
        if (!resposta.ok) {
            throw new Error('Erro ao carregar os Funcionarios');
        }
        return resposta.json();
    },

    async excluirFuncionario(id) {
        const resposta = await fetch(`${API_URL}/excluirFuncionario/${id}`, {
            method: 'DELETE',
        });
        if (!resposta.ok) {
            throw new Error('Erro ao excluir o Funcionario');
        }
    },

    async atualizarFuncionario(formState) {
        const resposta = await fetch(`${API_URL}/atualizarFuncionario`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formState),
        });
        if (!resposta.ok) {
            throw new Error('Erro ao gravar o Funcionario');
        }
    },

    async listarFuncionariosPorEquipe(id) {
        try {
            const resposta = await fetch(`${API_URL}/listarFuncionariosPorEquipe/${id}`);
            if (!resposta.ok) {
                const erroTexto = await resposta.text();
                throw new Error(`Erro ao carregar os Funcionarios por equipe: ${erroTexto}`);
            }
            return resposta.json();
        } catch (error) {
            console.error('Erro durante a chamada à API:', error.message);
            throw error;
        }
    }
    

}

export default api;


