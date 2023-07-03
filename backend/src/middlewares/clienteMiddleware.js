// Este arquivo é responsável pela validação dos dados que serão transmitidos ao banco de dados, ou seja, do front para o back
const validateFieldNome = (request, response, next) => {
    // Extrai o body da requisição
    const { body } = request;

    // Verifica se o nome foi passado corretamente
    if (body.nome === undefined) {
        // Retorna uma mensagem caso o nome não seja passado
        return response.status(400).json({ message: 'O campo "nome" precisa ser preenchido.'});
    }

    // Verifica se o nome foi passado corretamente
    if (body.nome === '') {
        // Retorna uma mensagem caso o nome esteja vazio
        return response.status(400).json({ message: 'O campo "nome" não pode ser vazio.'});
    }

    // Se estiver tudo correto passa para o próximo middleware
    next();
};

// Exporta o conteudo do arquivo para uso externo
module.exports = {
    validateFieldNome,
};