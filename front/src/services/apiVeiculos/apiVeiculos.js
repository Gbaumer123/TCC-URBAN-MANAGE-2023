const API_URL = 'http://localhost:3000/api';


const api = {

    //ROTAS PARA ADICONAR USUÁRIO
    async adicionaVeiculo(formState) {

        const resposta = await fetch(`${API_URL}/adicionaVeiculo`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formState),
        });

        if (!resposta.ok) {
            throw new Error('Erro ao adicionar o veiculo');
        }
    },

    async listarVeiculos() {
        try {
            const resposta = await fetch(`${API_URL}/listarVeiculos`);
            if (!resposta.ok) {
                const erroTexto = await resposta.text();
                throw new Error(`Erro ao carregar os veiculos: ${erroTexto}`);
            }
            return resposta.json();
        } catch (error) {
            console.error('Erro durante a chamada à API:', error.message);
            throw error;
        }
    },

    async buscarVeiculoPorId(idveiculos) {
        const resposta = await fetch(`${API_URL}/listarVeiculos/${idveiculos}`);
        if (!resposta.ok) {
            throw new Error('Erro ao carregar os usuarios');
        }
        return resposta.json();
    },

    async excluirVeiculo(idveiculos) {
        const resposta = await fetch(`${API_URL}/excluirVeiculo/${idveiculos}`, {
            method: 'DELETE',
        });
        if (!resposta.ok) {
            throw new Error('Erro ao excluir o veiculo');
        }
    },

    async atualizarVeiculo(formState) {
        const resposta = await fetch(`${API_URL}/atualizarVeiculo`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formState),
        });
        if (!resposta.ok) {
            throw new Error('Erro ao gravar o veiculo');
        }
    }

}

export default api;




