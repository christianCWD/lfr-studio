import match from './match'
import team from './team'
import stadium from './stadium'

// object types
import pricingConfig from './objects/pricingConfig'
import hotelManual from './objects/hotelManual'
import ticketCategoryManual from './objects/ticketCategoryManual'

import inventoryItem from "./inventoryItem"
import inventoryHold from "./inventoryHold"

export const schemaTypes = [
  // objects
  pricingConfig,
  ticketCategoryManual,
  hotelManual,

  // documents
  team,
  stadium,
  match,
  inventoryItem,
  inventoryHold,
]
