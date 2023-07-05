export const formatCpf = (cpf) => {
    // Remove qualquer caractere que não seja dígito
  cpf = cpf.replace(/\D/g, '');

  // Aplica a formatação do CPF e retorna
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
};

export const formatPhoneNumber = (phoneNumber) => {
    phoneNumber = phoneNumber.replace(/\D/g, '');
  
    return phoneNumber.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  }