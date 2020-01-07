# Sort Visualiser

Welcome to Sort Visualiser! This is a visualisation tool built with Vanilla JS and styled with SASS/CSS. I built this to teach myself more about sorting algorithms and their implementations. I hope you enjoy interacting with it as much as I enjoyed creating it :)

Access it here: https://wilsonhou.github.io/sortVisualiser

## Sorts

These are the sorts shown in Sort Visualiser

### Bubble Sort

Bubble Sort is implemented by continously iterating through a list, comparing adjacent values. If they are different, the values will be swapped. This yields a time complexity of **O(n<sup>2</sup>)**.
  
### Selection Sort

Selection Sort is implmenting by continuously iterating through a list, and selecting a minimum value. This value is then swapped with the first value of the array. The process is repeated with the second value, swapping the minimum value from the rest of the list.

By repeating this process, selection sort will sort with a time complexity of **O(n<sup>2</sup>)**.
  
### Quick Sort

Quick Sort, an inplace algorithm, is implemented recursively by randomly choosing a 'pivot' in a list. All values smaller than the pivot are shifted to the left, and all values larger will be shifted to the right. The pivot will then be in the correct position, and the left and right subarrays are quick-sorted. Base case is reached when the subarray is of length 1.

Quick Sort yields a time complexity of **O(nlog(n))**.
