const API_URL = 'http://localhost:3000/api';


const api = {

    //ROTAS PARA ADICONAR USUÁRIO
    async adicionaUsuario(formState) {

        const resposta = await fetch(`${API_URL}/adicionaUsuario`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formState),
        });

        if (!resposta.ok) {
            throw new Error('Erro ao adicionar o usuário');
        }
    },

    async listarUsuarios() {
        try {
            const resposta = await fetch(`${API_URL}/listarUsuarios`);
            if (!resposta.ok) {
                const erroTexto = await resposta.text();
                throw new Error(`Erro ao carregar os usuários: ${erroTexto}`);
            }
            return resposta.json();
        } catch (error) {
            console.error('Erro durante a chamada à API:', error.message);
            throw error;
        }
    },

    async buscarUsuarioPorId(idusuarios) {
        const resposta = await fetch(`${API_URL}/listarUsuarios/${idusuarios}`);
        if (!resposta.ok) {
            throw new Error('Erro ao carregar os usuarios');
        }
        return resposta.json();
    },

    async excluirUsuario(idusuarios) {
        const resposta = await fetch(`${API_URL}/excluirUsuario/${idusuarios}`, {
            method: 'DELETE',
        });
        if (!resposta.ok) {
            throw new Error('Erro ao excluir o usuario');
        }
    },

    async atualizarUsuario(formState) {
        const resposta = await fetch(`${API_URL}/atualizarUsuario`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formState),
        });
        if (!resposta.ok) {
            throw new Error('Erro ao gravar o usuario');
        }
    }

}

export default api;


