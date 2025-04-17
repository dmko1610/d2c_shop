
export async function submitOrderRandomError(payload: any) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const randomChance = Math.random();

      if (randomChance < 0.5) {
        resolve({ message: 'Order submitted successfully' });
      } else {
        const randomErrorType = Math.floor(Math.random() * 3);

        switch (randomErrorType) {
          case 0:
            reject({ code: 500 });
            break;
          case 1:
            reject({ code: 'OUT_OF_STOCK' });
            break;
          case 2:
            reject({ code: 'SERVICE_UNAVAILABLE' });
            break;
          default:
            reject({ code: 'UNEXPECTED_ERROR' });
        }
      }
    }, 2000);
  });
}