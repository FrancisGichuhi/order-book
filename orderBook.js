function reconcileOrder(existingBook, incomingOrder) {

  // 1. check if order book is empty, and if so add incoming order into it
  if ((existingBook === undefined || existingBook.length == 0)) {
    existingBook.push(incomingOrder)
    return existingBook
  }

  // 2. adds an order to the book when the book has orders of corresponding type (i.e. a sell with no buys)
  else for (let i = 0; i < existingBook.length; ++i) { //main loop. 
    if (existingBook[i].type === incomingOrder.type) {
      existingBook.push(incomingOrder)
      return existingBook
    }


    // 3. adds an order to the book when the book has a corresponding order type but no match
    else if (
      existingBook[i].quantity !== incomingOrder.quantity &&
      existingBook[i].price !== incomingOrder.price) {
      existingBook.push(incomingOrder)
      return existingBook
    }

    // 4. fulfills an order and removes the matching order when the book contains a matching order of the same quantity
    else if (
      existingBook[i].quantity === incomingOrder.quantity &&
      existingBook[i].price === incomingOrder.price) {
      existingBook.splice([i], 1)
      return existingBook
    }

    // 5. fulfills an order and reduces the matching order when the book contains a matching order of a larger quantity
    else if (
      existingBook[i].quantity > incomingOrder.quantity &&
      existingBook[i].price === incomingOrder.price) {
      existingBook[i].quantity = existingBook[i].quantity - incomingOrder.quantity
      return existingBook
    }

    // 6. partially fulfills an order, removes the matching order and adds the remainder of the order to the book when the book contains a matching order of a smaller quantity
    else if (
      existingBook[i].quantity < incomingOrder.quantity &&
      existingBook[i].price === incomingOrder.price) {
      incomingOrder.quantity = incomingOrder.quantity - existingBook[i].quantity
      existingBook.splice([i], 1)
      existingBook.push(incomingOrder)
      return existingBook
    }

    // 7. Extra Credit: it fulfills a mismatched order when both parties benefit
    else if ((existingBook[i].type === 'buy' && incomingOrder.type === 'sell') &&
      existingBook[i].quantity === incomingOrder.quantity &&
      incomingOrder.price < existingBook[i].price) {
      existingBook.splice([i], 1)
      return existingBook
    }

    // 8. Extra Credit: it does not fulfill a mismatched order when it does not benefit both parties
    else if ((existingBook[i].type === 'buy' && incomingOrder.type === 'sell') &&
      existingBook[i].quantity === incomingOrder.quantity &&
      incomingOrder.price > existingBook[i].price) {
      existingBook.push(incomingOrder)
      return existingBook
    }

  }
}

module.exports = reconcileOrder