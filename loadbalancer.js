/**
 * n = number of servers   -    1 to n
 * m = number of arrival times and burst times  -  length of the arrays, they are the same
 * arrival = [] arrival times
 * burstTime = [] of burst times
 * 
 * 
 * n = 4
 *                     2   3   1   4   3          
 * completion times =  12  7  11  10  13    -   start time + burst time
 * arrival times =     3   5   1   6   8
 * burst times =       9   2  10   4   5
 *                       
 *                       0   1   2  3 
 * serverFinishTimes = [11, 12, 13, 10]
 * 
 * output = [2, 3, 1, 4, 3]
 *   
 * heap length = 0
 * 
 * output = [2,3,1,4,3]    -1 if no servers are available
 * 
 *                  start (arrival) time min heap   -    start, finish, index(where to be placed in answer array)
 *      
 *                                8, 4
 * 
 *                        6, 3            5, 1
 * 
 *                 3, 0         1, 2
 * 
 * Make a min heap out of the arrival times, so as to go in arrival order, with index
 * If arrival times are equal, the one with lower index is "smaller"
 * Make an array of 0's from index 0 to n - 1 to represent server finish time. Server number is index + 1
 * While heap length is greater than 0
 * Get burst time for root element and add to start time
 * Find first item in server finish times where the value is less than or equal to root elements start time
 * Then replace that value with root elements finish time
 * Store server finish time index + 1 in root elements index of output array
 * Or -1 if no server is free
 * Swap 1st and last elements of min heap
 * Decrement heap length
 * Bubble root element down
 * 
 * return output array
 * 
 */

const getServerIndex = (n, arrival, burstTime) => {
  let heapLength = 1;
  const serverFreeTimes = new Array(n).fill(0);
  const serverAssignment = new Array(arrival.length);

  for (let i = 0; i < arrival.length; i++) {
    arrival[i] = [arrival[i], i];
  }

  const swap = (index1, index2) => {
    [arrival[index1], arrival[index2]] = [arrival[index2], arrival[index1]];
  }

  const compare = (index1, index2) => {
    return arrival[index1][0] === arrival[index2][0] ? 
      arrival[index1][1] < arrival[index2][1] :
      arrival[index1][0] < arrival[index2][0];
  }

  const getParentIndex = (childIndex) => {
    return Math.floor((childIndex - 1) / 2);
  }

  const getChildIndex = (parentIndex) => {
    let childIndex = parentIndex * 2 + 1;

    return childIndex >= heapLength || compare(childIndex, childIndex + 1) ?
      childIndex : childIndex + 1;
  }

  const bubbleUp = () => {
    let childIndex = heapLength - 1;
    let parentIndex = getParentIndex(childIndex);

    while (childIndex > 0 && compare(childIndex, parentIndex)) {
      swap(childIndex, parentIndex);
      childIndex = parentIndex;
      parentIndex = getParentIndex(childIndex);
    }
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

  while (heapLength < arrival.length) {
    heapLength++;
    bubbleUp();
  }

  while (heapLength > 0) {
    const arrivalTime = arrival[0][0];
    const arrivalIndex = arrival[0][1];
    const finishTime = arrivalTime + burstTime[arrivalIndex];

    for (let i = 0; i <= serverFreeTimes.length; i++) {
      if (i >= serverFreeTimes.length) {
        serverAssignment[arrivalIndex] = -1;
      } else if (arrivalTime >= serverFreeTimes[i]) {
        serverFreeTimes[i] = finishTime;
        serverAssignment[arrivalIndex] = i + 1;
        break;
      }
    }

    swap(0, heapLength - 1);
    heapLength--;
    bubbleDown();
  }

  return serverAssignment;
}

getServerIndex(4, [2,2,2,3], [1,3,1,2]);