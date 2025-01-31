export async function handleCepVerify(cep: string){
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(`Erro ao buscar CEP: ${response.statusText}`);
      }
      // ... (process data)
      return data;
    } catch (error) {
      throw error; // Re-throw the error to trigger Zod validation
    }
  }