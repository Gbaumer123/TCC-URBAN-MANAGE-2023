const { app } = require('./config');
const sistemaRoutes = require('./routes/sistemaRoutes');

// Rotas da API
app.use('/api', sistemaRoutes);

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
