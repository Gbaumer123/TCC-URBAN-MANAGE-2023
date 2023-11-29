// src/services/api.js
const API_URL = 'http://localhost:3000/api';

const api = {
    async addUser(formState) {

            const response = await fetch(`${API_URL}/cadastroUsuario`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formState),
            });

            if (!response.ok) {
                throw new Error('Erro ao adicionar o usuário');
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
