module.exports = (amount, installments, gateway = {}, response) => {
  const maxInstallments = installments.max_number && installments.max_interest_free
    ? Math.max(installments.max_number, installments.max_interest_free)
    : installments.max_number || installments.max_interest_free
  if (maxInstallments > 1) {
    // default installments option
    if (!installments.monthly_interest) {
      installments.max_interest_free = maxInstallments
    }
    if (response) {
      response.installments_option = {
        min_installment: installments.min_installment,
        max_number: installments.max_interest_free || installments.max_number,
        monthly_interest: installments.max_interest_free ? 0 : installments.monthly_interest
      }
    }

    // list installment options
    gateway.installment_options = []
    for (let number = 2; number < maxInstallments; number++) {
      const tax = !(installments.max_interest_free >= number)
      let interest
      if (tax) {
        interest = installments.monthly_interest / 100
      }
      gateway.installment_options.push({
        number,
        value: !tax ? amount.total / number
          // https://pt.wikipedia.org/wiki/Tabela_Price
          : amount.total * (interest / (1 - Math.pow(1 + interest, -number))),
        tax
      })
    }
  }
  return { response, gateway }
}
