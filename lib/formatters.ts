export const currancyFormatter = (number: number) => {
    const currencyFormatter = new Intl.NumberFormat("mad-DH", {
        currency: "MAD",
        style: "currency"
    })
    return currencyFormatter.format(number);

}