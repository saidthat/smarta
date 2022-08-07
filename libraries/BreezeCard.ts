type ProductName = 'PAR MartaMthly ' | '30Day';

/**
 * This function will parse the product name from the card page.
 * @param {string} rawHTML The raw HTML of the card page.
 * @returns {string}
 */
function parseProductName(rawHTML: string): string {
    const productName = rawHTML
        .split('<td class="Content_normal_black">')[1]
        .split('</td>')[0] as ProductName;

    switch (productName) {
        case 'PAR MartaMthly ':
            return 'Monthly unlimited';
        case '30Day':
            return '30 day';
        default:
            return 'Unknown';
    }
}

/**
 * This function will get the balance of the card.
 * @param {string} rawHTML The raw HTML of the card page.
 * @returns
 */
function parseBalance(rawHTML: string): string {
    const balance = rawHTML.split('$')[1].split('</td>')[0];
    return balance;
}

/**
 * This function will check to see if the given card number
 * has a "breeze product" associated with it.
 * @param {string} rawHTML The raw HTML of the card page.
 * @returns {boolean} True if the card has a breeze product.
 */
function hasProduct(rawHTML: string): boolean {
    const productSection = rawHTML
        .split('Content_normal_black">')[1]
        .split('</td>')[0];
    return !productSection.includes('No Active Products');
}

/**
 * Fetches the balance of the given breeze card number.
 * @param {string} cardNumber The card number to fetch the balance of.
 * @returns {Promise<string | null>} The balance of the given card number or null if an error
 * or no balance was found.
 */
export async function fetchBreezeCardData(
    cardNumber: string
): Promise<string | null> {
    try {
        const result = await fetch(
            `https://balance.breezecard.com/breezeWeb/cardnumber_qa.do`,
            {
                method: 'POST',
                body: `cardnumber=${cardNumber}&submitButton.x=1`,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        );
        const rawHTML = await result.text();

        if (rawHTML.includes('Please enter Valid Card Number')) {
            return 'Invalid Card Number!';
        }
        if (hasProduct(rawHTML)) {
            return parseProductName(rawHTML);
        }
        return `$${parseBalance(rawHTML)}`;
    } catch (error) {
        // console.log(error);
        return null;
    }
}
