const API_URL = 'http://localhost:3000/api';


const api = {

    //ROTAS PARA ADICONAR equipe
    async adicionaEquipe(formState) {

        const resposta = await fetch(`${API_URL}/adicionaEquipe`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formState),
        });

        if (!resposta.ok) {
            throw new Error('Erro ao adicionar a equipe');
        }
    },

    async listarEquipes() {
        try {
            const resposta = await fetch(`${API_URL}/listarEquipes`);
            if (!resposta.ok) {
                const erroTexto = await resposta.text();
                throw new Error(`Erro ao carregar as equipes: ${erroTexto}`);
            }
            return resposta.json();
        } catch (error) {
            console.error('Erro durante a chamada à API:', error.message);
            throw error;
        }
    },

    async buscarEquipePorId(id) {
        const resposta = await fetch(`${API_URL}/listarEquipes/${id}`);
        if (!resposta.ok) {
            throw new Error('Erro ao carregar as Equipes');
        }
        return resposta.json();
    },

    async excluirEquipe(id) {
        const resposta = await fetch(`${API_URL}/excluirEquipe/${id}`, {
            method: 'DELETE',
        });
        if (!resposta.ok) {
            throw new Error('Erro ao excluir a Equipe');
        }
    },

    async atualizarEquipe(formState) {
        const resposta = await fetch(`${API_URL}/atualizarEquipe`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formState),
        });
        if (!resposta.ok) {
            throw new Error('Erro ao gravar a Equipe');
        }
    },
    async vincularFuncionarioEquipe(idFuncionario, idEquipe) {
        const resposta = await fetch(`${API_URL}/vincularFuncionarioEquipe`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ idFuncionario, idEquipe }),
        });
        if (!resposta.ok) {
            throw new Error('Erro ao vincular funcionário à equipe');
        }
    }
}

export default api;


