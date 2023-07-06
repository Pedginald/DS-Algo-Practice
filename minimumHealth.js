/**
 * Return minimum health to achieve input parameteres
 * 
 * initial_players = 1 3 4 4 5 6    3 + 3 + 4 + 4 + 4 + 4 + 5 + 5 = 32
 * new_players = 2, 4, 4, 5, 6, 7, 8
 * rank = 5       rankth element is max heap length - rank = ranked player index = 6 - 5 = 1
 * 
 * Answer = 1 + 2 + 2 + 3 = 8
 * 
 * answer = 1 + 1 + 1 + 2 = 5
 *   
 * 
 *            0  1  2  3  4  5  6  7  8  9  10 11 12
 * max heap = 
 * 
 * parent index = floor (n - 1) / 2   1, 1, 2, 2, 3, 4, 4, 4, 4, 5, 5, 6, 6, 7
 * 
 * answer += 3 + 
 * 
 * max heap length = 6
 * 
 *                      6
 *                 4         5
 *            1       4    3
 * 
 * min heap length = rank
 * answer += 5 + 5 + 5 + 5
 * 
 *                  5
 *              6    
 * 
 * New idea:
 * 
 * Rather than have the kth greatest element as the root node in the initial_players max heap,
 * we could have it as the root node in the min heap.
 * So then for each new player, add it to the initial_players max heap, if that node bubbles to the top (root node),
 * compare it with the root node in the min heap, if it is greater, swap them, bubble them both down.
 *                                               
 */

const getMinimumHealth = (initial_players, new_players, rank) => {
  let minimumHealth = 0;
  const rankedPlayerIndex = initial_players.length - rank;
  const high_ranked_players = initial_players.splice(rankedPlayerIndex);
  let heapLength = rank;

  const compare = (index1, index2) => {
    return high_ranked_players[index1] < high_ranked_players[index2];
  }

  const swap = (index1, index2) => {
    [high_ranked_players[index1], high_ranked_players[index2]] = [high_ranked_players[index2], high_ranked_players[index1]];
  }

  const getChildIndex = (parentIndex) => {
    const childIndex = parentIndex * 2 + 1;

    return childIndex >= heapLength - 1 || compare(childIndex, childIndex + 1) ?
      childIndex : childIndex + 1;
  }

  const bubbleDown = () => {
    let parentIndex = 0;
    let childIndex = getChildIndex(parentIndex);

    while (childIndex < heapLength && compare(childIndex, parentIndex)) {
      swap(childIndex, parentIndex);
      parentIndex = childIndex;
      childIndex = getChildIndex(parentIndex);
    }
  }

  for (let i = 0; i <= new_players.length; i++) {
    minimumHealth += high_ranked_players[0];
    if (new_players[i] > high_ranked_players[0]) {
      high_ranked_players[0] = new_players[i];
      bubbleDown();
    }
  }

  // return minimumHealth;
  console.log(minimumHealth);
}
