// src/services/api.js
const API_URL = 'http://localhost:3000/api';

const api = {
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

/*
    async getProdutos() {
        const resposta = await fetch(`${API_URL}/produtos/listar-produtos`);
        if (!resposta.ok) {
            throw new Error('Erro ao carregar os produtos');
        }
        return resposta.json();
    },

    async excluirProduto(id) {
        const resposta = await fetch(`${API_URL}/produtos/excluir-produto/${id}`, {
            method: 'DELETE',
        });
        if (!resposta.ok) {
            throw new Error('Erro ao excluir o produto');
        }
    },
*/
// Adicione aqui outras chamadas de API conforme necessário
