export const formatCpf = (cpf) => {
    // Remove qualquer caractere que não seja dígito
  cpf = cpf.replace(/\D/g, '');

  // Aplica a formatação do CPF e retorna
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
};

export const formatCPFInput = (value) => {
  // Remove a formatação atual do CPF
  const unformattedValue = value ? value.replace(/[.-]/g, "") : "";

  // Aplica a nova formatação do CPF
  const parts = unformattedValue.match(/(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})/);
  
  const formattedCPF = !parts[2]
    ? parts[1]
    : `${parts[1]}.${parts[2]}${parts[3] ? `.${parts[3]}` : ""}${parts[4] ? `-${parts[4]}` : ""}`;

  return formattedCPF;
};

export const formatPhoneNumber = (phoneNumber) => {
    phoneNumber = phoneNumber.replace(/\D/g, '');
  
    return phoneNumber.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
};

export const formatPhoneNumberInput = (value) => {
  const unformattedValue = value ? value.replace(/[.-]/g, "") : "";

  const parts = unformattedValue.match(/(\d{0,2})(\d{0,5})(\d{0,4})/);

  //console.log(parts)
  
  const formattedPhone = !parts[2]
    ? `${parts[1] ? `(${parts[1]}` : "" }`
    : `${!parts[3] ? `(${parts[1]}) ${parts[2]}` : `(${parts[1]}) ${parts[2]}-${parts[3]}`}`;

  if (!parts[2]) {
    if (parts[1]) {
      console.log(`(${parts[1]}`)
    }
  } else if (!parts[3]){
    console.log(`(${parts[1]}) ${parts[2]}`);
  } else {
    console.log(`(${parts[1]}) ${parts[2]}-${parts[3]}`);
  }

  return formattedPhone;
};