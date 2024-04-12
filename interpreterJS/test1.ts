// Fonction 1
function fonction1(): Promise<string> {
  return new Promise((resolve, reject) => {
    // Simuler une opération asynchrone
    setTimeout(() => {
      resolve("Résultat de la fonction 1");
    }, 2000);
  });
}

// Fonction 2
function fonction2(): Promise<string> {
  return new Promise((resolve, reject) => {
    // Simuler une autre opération asynchrone
    setTimeout(() => {
      resolve("Résultat de la fonction 2");
    }, 1000);
  });
}

// Appel des fonctions de manière asynchrone
async function executerFonctions() {
  const resultat1 = await fonction1();
  console.log(resultat1);

  const resultat2 = await fonction2();
  console.log(resultat2);
}

executerFonctions();
