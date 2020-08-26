import OSS from './oss_cards.json';
import PRODUCTS from './product_cards.json';
import GSUITE from './gsuite_cards.json';
import USERS from './user_cards.json';

const sortByCardId = (a, b) => {
  if (a.cardId > b.cardId) return 1;
  if (a.cardId < b.cardId) return -1;
  return 0;
};

const SORTED_OSS = OSS.sort(sortByCardId);
const SORTED_PRODUCTS = PRODUCTS.sort(sortByCardId);
const SORTED_GSUITE = GSUITE.sort(sortByCardId);
const SORTED_USERS = USERS.sort(sortByCardId);

const cards = [].concat(SORTED_PRODUCTS, SORTED_GSUITE, SORTED_OSS, SORTED_USERS);

export default cards;
