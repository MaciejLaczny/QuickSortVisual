let w = 5;

function setup() {
  createCanvas(windowWidth, windowHeight);
  values = new Array(floor(width / w));
  for(let i = 0; i < values.length; i++){
      values[i] = random(height);
  }
  frameRate(50);
  quickSort(values, 0, values.length - 1);
}

function draw() {
  background(51);

  for(let i = 0; i <= values.length; i++){
    stroke(0);
    fill(255);
    rect( i * w, height - values[i], w, values[i] )

  }
}

// 16 8 12 15 6 3 9 5 10

async function partition(array, start, end){
  let pivot = array[start];
  let i = start;
  let j = end;
  while(i <= j){
    while(array[i] <= pivot){
      i++;
    }
    while(array[j] > pivot){
      j--;
    }
    if(i <= j){
      await swap(array, i, j);
      i++;
      j--;
    }
  }
  await swap(array, start, j);
  return j;
}

async function swap(array, firstIndex, secondIndex){
  await sleep(10);
  let temp = array[firstIndex];
  array[firstIndex] = array[secondIndex];
  array[secondIndex] = temp;
}

async function quickSort(array, start, end){
  if(start < end){
    let j = await partition(array, start, end);

    await Promise.all([
      await quickSort(array, start, j - 1),
      await quickSort(array, j + 1, end)
    ]);
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}