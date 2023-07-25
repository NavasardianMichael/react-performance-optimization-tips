export const getExpensiveCalculationsResult = (count: number = 100_000_0000) => {
    let iteration = 0

    while(iteration < count) {
        iteration ++
    }

    return iteration
}

export const shuffle = <T>(array: T[]): T[] => {
    if(!array) return []
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
}