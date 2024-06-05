
const API_URL = 'http://localhost:3000/api';


const api = {

    //ROTAS PARA ADICONAR Atividade
    async adicionaAtividade(formState) {

        const resposta = await fetch(`${API_URL}/adicionaAtividade`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formState),
        });

        if (!resposta.ok) {
            throw new Error('Erro ao adicionar a Atividade');
        }
    },

    async listarAtividades() {
        try {
            const resposta = await fetch(`${API_URL}/listarAtividades`);
            if (!resposta.ok) {
                const erroTexto = await resposta.text();
                throw new Error(`Erro ao carregar as Atividades: ${erroTexto}`);
            }
            return resposta.json();
        } catch (error) {
            console.error('Erro durante a chamada à API:', error.message);
            throw error;
        }
    },




    async buscarAtividadePorId(id) {
        const resposta = await fetch(`${API_URL}/listarAtividades/${id}`);
        if (!resposta.ok) {
            throw new Error('Erro ao carregar as Atividades');
        }
        return resposta.json();
    },

    async excluirAtividade(id) {
        const resposta = await fetch(`${API_URL}/excluirAtividade/${id}`, {
            method: 'DELETE',
        });
        if (!resposta.ok) {
            throw new Error('Erro ao excluir a Atividade');
        }
    },

    async atualizarAtividade(formState) {
        const resposta = await fetch(`${API_URL}/atualizarAtividade`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formState),
        });
        if (!resposta.ok) {
            throw new Error('Erro ao gravar a Atividade');
        }
    }
}

export default api;


